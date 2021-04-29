const express = require('express');
const router = express.Router();
const controller = require('../controller.js');

router.get('/*', (req, res) => {
  let url = '';
  Object.keys(req.params).forEach(key => {
    if (key === '0') {
      url += req.params[key];
    } else {
      url += '/' + req.params[key];
    }
  });

  if (url !== undefined) {
    controller.getURL(url)
      .then(address => {
        if (address !== undefined) {
          res.redirect(address);
        } else {
          throw 'Address returned for current key is undefined';
        }
      })
      .catch(err => {
        console.error(err);
        res.end();
      })
  } else {
    res.end();
  }
});

module.exports = router;