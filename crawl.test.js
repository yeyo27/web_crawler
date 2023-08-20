const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('normalize https://blog.boot.dev/path/ to equal blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('normalize https://blog.boot.dev/path to equal blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('normalize http://blog.boot.dev/path/ to equal blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('normalize http://blog.boot.dev/path to equal blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});