const { URL, Lastkey } = require('../database/index.js');

module.exports = {
  add: (key, url) => {
    return URL.create({
      key: key, url: url
    })
    .catch(err => {
      console.error(err);
    });
  },

  get: (key) => {
    return URL.findAll({
      where: {
        key: key
      }
    })
    .then(result => {
      if (result[0] === undefined)
        return undefined;
      let retrievedURL = result[0].dataValues.url;
      return retrievedURL;
    })
    .catch(err => {
      console.error(err);
    });
  },

  setLastKey: (key) => {
    return Lastkey.update({ key: key }, {
      where: { id: 1 }
    })
    .catch(err => {
      console.error(err);
    });
  },

  getLastKey: () => {
    return Lastkey.findAll({
      where: {
        id: 1
      }
    })
    .then(result => {
      let lastKey = result[0].dataValues.key;
      return lastKey;
    })
    .catch(err => {
      console.error(err);
    });
  }
}