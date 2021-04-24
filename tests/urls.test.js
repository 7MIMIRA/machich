const URL = require('../model/urls.js');
const nextKey = require('../utils/keyGenerator.js');

beforeEach(() => {
  URL.clearStorage();
});

test('getStorageSize method of model returns the correct size of the storage object', () => {
  expect(URL.getStorageSize()).toBe(0);
  URL.add('abc', 'http://aURL.com');
  expect(URL.getLastKey()).toBe('abc');
  expect(URL.getStorageSize()).toBe(1);
  URL.add('def', 'http://anotherURL.com');
  expect(URL.getLastKey()).toBe('def');
  expect(URL.getStorageSize()).toBe(2);
});

test('clearStorage method of model clears the storage object', () => {
  URL.add('abc', 'http://aURL.com');
  URL.add('def', 'http://anotherURL.com');
  expect(URL.getLastKey()).toBe('def');
  expect(URL.getStorageSize()).toBe(2);
  URL.clearStorage();
  expect(URL.getLastKey()).toBe('');
  expect(URL.getStorageSize()).toBe(0);
});

test('successfully adds first key to empty URL store', () => {
  let testURL = 'http://joselopez.com/hirethisguy';
  let key = nextKey();
  URL.add(key, testURL);
  let retrievedURL = URL.get(key);
  expect(retrievedURL).toBe(testURL);
  expect(URL.getStorageSize()).toBe(1);
});

test('successfully adds additional URLs to URL store', () => {
  let testURL1 = 'http://youknowyouwantto.com/:)';
  let testURL2 = 'http://dontmakemebeg.plz/🙏';
  let key1 = nextKey(URL.getLastKey());
  let key2 = nextKey(key1);
  URL.add(key1, testURL1);
  URL.add(key2, testURL2);
  let retrievedURL1 = URL.get(key1);
  let retrievedURL2 = URL.get(key2);
  expect(retrievedURL1).toBe(testURL1);
  expect(retrievedURL2).toBe(testURL2);
  expect(URL.getStorageSize()).toBe(2);
});

test('Adds custom URL without affecting random key generation order', () => {
  let aURL = 'http://whatsup.com';
  let customKey = 'myTinyLink';
  URL.add(nextKey(URL.getLastKey()), aURL);
  expect(URL.getLastKey()).toBe('a');
  URL.addCustom(customKey, aURL);
  expect(URL.getLastKey()).toBe('a');
  URL.add(nextKey(URL.getLastKey()), aURL);
  expect(URL.getLastKey()).toBe('b');
});