const express = require('express');
const app = express();
const PORT = 80;
const controller = require('./controller.js');

app.use(express.static('public'));
app.use(express.json());

app.get('/:url', (req, res) => {
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

app.post('/', (req, res) => {
  // TODO: Add URL validation before continuing to add to store of shortened URLs
  let domain = req.headers.origin;
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
});

app.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});