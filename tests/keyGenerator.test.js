const nextKey = require('../utils/keyGenerator.js');

test('if an undefined or empty string is passed in to nextKey function, create a key with first character of character set', () => {
  let result1 = nextKey();
  let result2 = nextKey('');
  expect(result1).toBe('a');
  expect(result2).toBe('a');
});

test('nextKey returns next available key combination', () => {
  let lastKey = 'abb';
  let next = nextKey(lastKey);
  expect(next).toBe('abc');
  next = nextKey(next);
  expect(next).toBe('abd');
});

test('nextKey increases key length when last possible combination has been reached for the current key length', () => {
  let lastKey = '999';
  let next = nextKey(lastKey);
  expect(next).toBe('aaaa');
})