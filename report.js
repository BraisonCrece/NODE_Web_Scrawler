const colors = require('colors/safe');

const printReport = (pages) => {
  const sorted = Object.entries(pages).sort((a,b) => {
    return b[1] - a[1]
  })

  const pagesOrdered = Object.fromEntries(sorted)

  console.log(colors.green(`\n\n========================================================\n*****`),
              colors.magenta(`                CRAWL REPORT                `),
              colors.green(`*****\n========================================================\n`))
  for (const page in pagesOrdered) {
    console.log(colors.blue('[x] '),`Found ${colors.yellow(pages[page])} internal links to ${colors.green(page)}`)
  }
}


module.exports = {
  printReport
}
