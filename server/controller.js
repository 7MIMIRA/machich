// const Axios = require('axios');
const URL = require('../model/urls.js');
const nextKey = require('../utils/keyGenerator.js');
const formatURL = require('../utils/formatURLInput.js');

module.exports = {
  addURL: (url) => {
    return new Promise((resolve, reject) => {
      let key = nextKey(URL.getLastKey());
      url = formatURL(url);
      URL.add(key, url);
      resolve(key);
    });
  },

  addCustomURL: (key, url) => {
    return new Promise((resolve, reject) => {
      url = formatURL(url);
      URL.addCustom(key, url);
      resolve(key);
    });
  },

  getURL: (key) => {
    return new Promise((resolve, reject) => {
      let url = URL.get(key);
      resolve(url);
    });
  },

  keyAvailable: (key) => {
    return URL.get(key) === undefined;
  }
}
