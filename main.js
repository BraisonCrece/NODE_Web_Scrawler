const { crawlPage } = require('./crawl.js')

async function main() {
  const baseURL = process.argv.slice(2);
  if(baseURL.length != 1) {
    console.log('ERROR: insert one and only one URL');
    process.exit(1)
  }

  const pages = await crawlPage(baseURL, baseURL, {})

  for(const page of Object.entries(pages)) {
    console.log(page);
  }
}

main()
