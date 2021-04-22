const https = require("https");
const fs = require("fs");
const express = require('express');
const app = express();
const controller = require('./controller.js');


const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/machich.app/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/machich.app/fullchain.pem")
};

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
  controller.addURL(req.body.url)
    .then(newURL => {
      if (newURL !== undefined) {
        res.send(`machich.app/${newURL}`);   // TODO set domain to an environment variable
      } else {
        throw 'invalid URL passed in';
      }
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

app.listen(80, () => {
  console.log(`listening on localhost:80`);
});

https.createServer(options, app).listen(443);