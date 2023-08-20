const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(url) {
    const urlObject =  new URL(url);
    const normalizedURL = `${urlObject.hostname}${urlObject.pathname}`
    if (normalizedURL[normalizedURL.length - 1] === "/") {
        return normalizedURL.slice(0, -1)
    }
    return normalizedURL
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === "/") {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`error with relative url: ${err.message}`);
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`);
            }
        }
    }
    return urls;
}


async function crawlPage(baseURL, currentURL, pages) {
    const currentURLObject = new URL(currentURL)
    const baseURLObject = new URL(baseURL)
    if (currentURLObject.hostname !== baseURLObject.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL] += 1
        return pages
    }

    currentURL === baseURL ? pages[normalizedCurrentURL] = 0 : pages[normalizedCurrentURL] = 1

    console.log(`crawling ${currentURL}...`);

    const response = await fetch(currentURL)

    const statusCode = response.status
    if (statusCode >= 400) {
        console.log(`Error code ${statusCode}`)
        return pages
    }

    const contentType = response.headers.get('content-type')
    if (!contentType.includes('text/html')) {
        console.log(`Content-Type is ${contentType}. Expected: text/html`)
        return pages
    }

    const htmlBody = await response.text()

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)
    console.log(nextURLs)
    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}