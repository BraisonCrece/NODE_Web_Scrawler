const fetch = require('node-fetch');
const { JSDOM } = require('jsdom')
const jsdom = require('jsdom');

const normalizeURL = (url)=> {
  if(!url) {
    return url
  }
  try {
    const urlObj = new URL(url)
    return `${urlObj.host}${urlObj.pathname.toLowerCase()}`
  } catch {
    console.log('Something went wrong with the URL normalization');
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

  console.log(`actively crawling: ${currentURL}`);

  try{
    const response = await fetch(currentURL)
    if(!response.ok) {
      console.log(`Error: ${response.status}`)
      return pages
    }
    if(!response.headers.get('content-type').startsWith('text/html')) {
      console.log('The page must have a text/html content type')
      return pages
    }

    const htmlBody = await response.text()
    const nextURLs =  getURLsFromHTML(htmlBody, baseURL)

    for(const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
  }catch(err){
    console.log(`oops, something went wrong. Error: ${err.message}`);
  }

  return pages
}




  module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }
