function printReport(pages) {
    console.log('Starting report...')
    const sortedPages = sortObjectByValue(pages)
    for (const [url, count] of Object.entries(sortedPages)) {
        console.log(`Found ${count} internal links to ${url}`)
    }
}

function sortObjectByValue(object) {
    const entries = Object.entries(object)
    entries.sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(entries);
}

module.exports = {
    printReport
}