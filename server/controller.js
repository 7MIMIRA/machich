// const Axios = require('axios');
const URL = require('../model/urls.js');
const nextKey = require('../utils/keyGenerator.js');
const formatURL = require('../utils/formatURLInput.js');

module.exports = {
  addURL: (url) => {
    return new Promise((resolve, reject) => {
      url = formatURL(url);
      URL.getLastKey()
      .then(lastKey => {
        nextFreeKey(lastKey)
        .then(newKey => {
          URL.add(newKey, url)
          .then(() => {
            resolve(newKey);
            URL.setLastKey(newKey);
          })
          .catch(err => {
            reject(err);
          });
        })
        .catch(err => {
          reject(err);
        });
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  addCustomURL: (key, url) => {
    return new Promise((resolve, reject) => {
      url = formatURL(url);
      URL.add(key, url)
      .then(result => {
        if (result === undefined)
          resolve(undefined);
        resolve(result.dataValues.key);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  getURL: (key) => {
    return URL.get(key)
    .then(result => {
      return result;
    })
    .catch(err => {
      console.error(err);
    });
  },

  keyAvailable: (key) => {
    return URL.get(key)
    .then(result => {
      return result === undefined;
    })
    .catch(err => {
      console.error(err);
    });
  }
}

async function nextFreeKey(lastKey) {
  let newKey = nextKey(lastKey);
  while (! await module.exports.keyAvailable(newKey)) {
    newKey = nextKey(newKey);
  }
  return newKey;
}
