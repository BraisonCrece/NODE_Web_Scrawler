const normalizeURL = (url)=> {
  if(!url) {
    return url
  }
  const urlObj = new URL(url)
  return `${urlObj.host}${urlObj.pathname.toLowerCase()}`
}

module.exports = {
  normalizeURL
}
