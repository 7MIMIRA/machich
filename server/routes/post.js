const express = require('express');
const router = express.Router();
const controller = require('../controller.js');

router.post('/', (req, res) => {
  let domain = req.headers.host;
  // TODO: Add URL validation before continuing to add to store of shortened URLs
  if (!req.body.custom) {
    controller.addURL(req.body.url)
      .then(newURL => {
        if (newURL !== undefined) {
          res.send(`${domain}/${newURL}`);   // TODO set domain to an environment variable
        } else {
          throw 'invalid URL passed in';
        }
      })
      .catch((err) => {
        console.error(err);
        res.end();
      });
  } else {
    controller.addCustomURL(req.body.key, req.body.url)
      .then(newURL => {
        if (newURL !== undefined) {
          res.send(`${domain}/${newURL}`);   // TODO set domain to an environment variable
        } else {
          throw 'invalid URL passed in';
        }
      })
      .catch((err) => {
        console.error(err);
        res.end();
      });
  }
});

module.exports = router;