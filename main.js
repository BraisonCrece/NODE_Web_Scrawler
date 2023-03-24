const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')
const colors = require('colors/safe');



async function main() {
  const baseURL = process.argv.slice(2);
  if(baseURL.length != 1) {
    console.log(colors.red('ERROR: insert one and only one URL'));
    process.exit(1)
  }

  const pages = await crawlPage(baseURL, baseURL, {})

  printReport(pages)
}

main()
