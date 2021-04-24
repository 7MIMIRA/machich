const express = require('express');
const router = express.Router();
const controller = require('../controller.js');

router.get('/:url', (req, res) => {
  let url = req.params.url;
  if (url !== undefined) {
    controller.getURL(req.params.url)
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
  }
});

module.exports = router;