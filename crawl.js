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





  module.exports = {
    normalizeURL,
    getURLsFromHTML
  }
