function normalizeURL(url) {
    const urlObject =  new URL(url)
    if (url[url.length - 1] === "/") {
        urlObject.pathname = urlObject.pathname.slice(0, -1)
    }
    return `${urlObject.hostname}${urlObject.pathname}`
}

module.exports = {
    normalizeURL
}