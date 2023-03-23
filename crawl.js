const fetch = require('node-fetch');
const { JSDOM } = require('jsdom')
const jsdom = require('jsdom');

const normalizeURL = (url)=> {
  if(!url) {
    return url
  }
  const urlObj = new URL(url)
  return `${urlObj.host}${urlObj.pathname.toLowerCase()}`
}

const getURLsFromHTML = (htmlBody, baseURL) => {
  if(!htmlBody || !baseURL){
    return null
  }
  const dom = new JSDOM(htmlBody)
  const links = Array.from(dom.window.document.querySelectorAll('a'))
  return links.map(path => `${baseURL}${path}`)
}

const crawlPage = (base_url) => {
  try{
    fetch(base_url)
    .then(response => {
      if(!response.ok){
        console.log(`Error: ${response.status}`)
        return
      }
      if(!response.headers.get('content-type').startsWith('text/html')){
        console.log('The page must return a text/html content type');
        return
      }
      return response.text()
    })
    .then(htmlBody => {
      console.log(htmlBody);
    })

  }catch(e){
    console.log("oops, something went wrong :S");
  }
}




  module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }
