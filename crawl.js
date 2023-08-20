function normalizeURL(url) {
    const urlObject =  new URL(url);
    if (url[url.length - 1] === "/") {
        urlObject.pathname = urlObject.pathname.slice(0, -1)
    }
    return `${urlObject.hostname}${urlObject.pathname}`
}


const jsdom = require("jsdom");
const { JSDOM } = jsdom;
function getURLsFromHTML(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody);
    const anchorElements = dom.window.document.querySelectorAll('a')
    let urls = []
    anchorElements.forEach((anchorElement) => {
        anchorElement.href[0] === '/' ? urls.push(baseURL + anchorElement.href) : urls.push(anchorElement.href)
    })
    return urls
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}