let storage = {};
let lastAddedKey = '';

module.exports = {
  add: (key, url) => {
    storage[key] = url;
    lastAddedKey = key;
  },
  get: (key) => {
    return storage[key];
  },
  getLastKey: () => {
    return lastAddedKey;
  },
  getStorageSize: () => {
    return Object.keys(storage).length;
  }
}
