const {crawlPage} = require("./crawl");

async function main(){
    const arguments = process.argv.slice(2)
    if (arguments.length === 1){
        console.log(`Crawler starting for ${arguments[0]}...`)
        const pages = await crawlPage(arguments[0], arguments[0], {})
        console.log(pages)
    } else {
        console.log(`Error. Expected number of arguments: 1. Received: ${arguments.length}`)
    }
}

main()