const fetch = require('node-fetch');
const { JSDOM } = require('jsdom')
const jsdom = require('jsdom');
const colors = require('colors/safe');

const normalizeURL = (url)=> {
  if(!url) {
    return url
  }
  try {
    const urlObj = new URL(url)
    return `${urlObj.host}${urlObj.pathname.toLowerCase()}`
  } catch {
    console.log(colors.red('Something went wrong with the'), colors.blue('URL normalization'));
  }
}

const getURLsFromHTML = (htmlBody, baseURL) => {
  if(!htmlBody || !baseURL){
    return null
  }
  const dom = new JSDOM(htmlBody)
  const links = Array.from(dom.window.document.querySelectorAll('a'))
  return links.map(path => `${baseURL}${path}`)
}

const crawlPage = async (baseURL, currentURL, pages) => {
  const baseUrlObj = new URL(baseURL)
  const currentUrlObj = new URL(currentURL)

  if(baseUrlObj.hostname != currentUrlObj.hostname) {
    return pages
  }

  const normalizedCurrentUrl = normalizeURL(currentURL)

  if(pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++
    return pages
  }

  pages[normalizedCurrentUrl] = 1

  console.log(colors.blue('-> '), colors.yellow(`actively crawling:`), colors.green(`${currentURL}`));

  try{
    const response = await fetch(currentURL)
    if(!response.ok) {
      console.log(`Error: ${response.status}`)
      return pages
    }
    if(!response.headers.get('content-type').startsWith('text/html')) {
      console.log(colors.blue('-> '),colors.red('ERROR: The page must have a'), colors.blue('text/html'), colors.red('content type'))
      return pages
    }

    const htmlBody = await response.text()
    const nextURLs =  getURLsFromHTML(htmlBody, baseURL)

    for(const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
  }catch(err){
    console.log(colors.red(`oops, something went wrong. Error:`), colors.blue(` ${err.message}`))
  }

  return pages
}




  module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }
