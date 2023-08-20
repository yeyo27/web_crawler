const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const {getURLsFromHTML} = require("./crawl");

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

const htmlString = `<html lang="en">
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/path"><span>Go to Boot.dev/path</span></a>
    </body>
</html>`

test('get url https://blog.boot.dev and https://blog.boot.dev/path from html', () => {
    expect(getURLsFromHTML(htmlString, 'https://blog.boot.dev')).toStrictEqual(["https://blog.boot.dev/", "https://blog.boot.dev/path"])
});