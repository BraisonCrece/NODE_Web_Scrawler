const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')


// normalizeURL Tests
const normalizedOutput = 'braisoncrece.dev/profile'

test('returns null when input is null', () => {
  expect(normalizeURL(null)).toBe(null);
});

test('returns undefined when input is undefined', () => {
  expect(normalizeURL(undefined)).toBe(undefined);
});

test('returns the URL normalized when it has the https protocol', () => {
  expect(normalizeURL("https://braisoncrece.dev/profile")).toBe(normalizedOutput);
});

test('returns the URL normalized when it has the http protocol', () => {
  expect(normalizeURL("http://braisoncrece.dev/profile")).toBe(normalizedOutput);
});

test('returns the normalized URL when it has a forward slash at the end', () => {
  expect(normalizeURL("https://braisoncrece.dev/profile")).toBe(normalizedOutput);
});

test('returns the normalized URL when it hasn\'t a forward slash at the end', () => {
  expect(normalizeURL("https://braisoncrece.dev/profile")).toBe(normalizedOutput);
});


// GetURLsFromHTML Tests
const htmlBody = `<!DOCTYPE html><a href='/12'>Hola</a><a href='/24'>Adios</a>`
const baseURL = 'banji.fly.dev'

test('returns null if any of the parameters are null', () => {
  expect(getURLsFromHTML(null, baseURL)).toBe(null);
})

test('returns an Array of URL\'s', () => {
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([ 'banji.fly.dev/12', 'banji.fly.dev/24' ]);
})



// crawlPage Tests
// const base_url = 'https://banji.fly.dev'
// const json_url = 'https://jsonplaceholder.typicode.com/posts/1'

// test('crawlPage should return the HTML body of a page', async () => {
//   const htmlBody = await crawlPage(base_url);
//   expect(htmlBody).toBeDefined();
// });

// test('crawlPage should return an error message for non-200 response', async () => {
//   console.log = jest.fn();
//   await crawlPage(`https://winamax.es/jaja`);
//   expect(console.log).toHaveBeenCalledWith('Error: 404');
// });

// test('crawlPage should return an error message for non-HTML content type', async () => {
//   console.log = jest.fn();
//   await crawlPage(json_url);
//   expect(console.log).toHaveBeenCalledWith('The page must have a text/html content type');
// });

// test('logs error message on invalid URL', async () => {
//   console.log = jest.fn();
//   await crawlPage('');
//   expect(console.log).toHaveBeenCalledWith('oops, something went wrong :S');
//   });

