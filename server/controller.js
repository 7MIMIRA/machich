// const Axios = require('axios');
const URL = require('../model/urls.js');
const nextKey = require('../utils/keyGenerator.js');
const formatURL = require('../utils/formatURLInput.js');

const addURL = (url) => {
  return new Promise((resolve, reject) => {
    let key = nextKey(URL.getLastKey());
    url = formatURL(url);
    URL.add(key, url);
    resolve(key);
  })
}

const getURL = (key) => {
  return new Promise((resolve, reject) => {
    let url = URL.get(key);
    resolve(url);
  });
};

module.exports.addURL = addURL;
module.exports.getURL = getURL;
