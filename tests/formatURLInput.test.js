const formatter = require('../utils/formatURLInput.js');

test('Does not modify input URL if it begins with http or https', () => {
  let url1 = 'http://google.com';
  let url2 = 'https://google.com';
  let result1 = formatter(url1);
  let result2 = formatter(url2);
  expect(result1).toBe(url1);
  expect(result2).toBe(url2);
});

test('Prepends http:// to URL if it does not begin with http or https', () => {
  let url1 = 'google.com';
  let url2 = 'www.google.com';
  let result1 = formatter(url1);
  let result2 = formatter(url2);
  expect(result1).toBe('http://google.com');
  expect(result2).toBe('http://www.google.com');
});