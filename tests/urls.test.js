const URL = require('../model/urls.js');
const nextKey = require('../utils/keyGenerator.js');

test('successfully adds first key to empty URL store', () => {
  let testURL = 'http://joselopez.com/hirethisguy';
  let key = nextKey();
  URL.add(key, testURL);
  let retrievedURL = URL.get(key);
  expect(retrievedURL).toBe(testURL);
  expect(URL.getStorageSize()).toBe(1);
});

test('successfully adds additional URLs to URL store', () => {
  let testURL2 = 'http://youknowyouwantto.com/:)';
  let testURL3 = 'http://dontmakemebeg.plz/🙏';
  let key2 = nextKey(URL.getLastKey());
  let key3 = nextKey(key2);
  URL.add(key2, testURL2);
  URL.add(key3, testURL3);
  let retrievedURL2 = URL.get(key2);
  let retrievedURL3 = URL.get(key3);
  expect(retrievedURL2).toBe(testURL2);
  expect(retrievedURL3).toBe(testURL3);
  expect(URL.getStorageSize()).toBe(3);
});