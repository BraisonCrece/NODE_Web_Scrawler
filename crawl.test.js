const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

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
