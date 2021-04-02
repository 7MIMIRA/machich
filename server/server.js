const express = require('express');
const app = express();
const PORT = 8000;
const controller = require('./controller.js');

app.use(express.static('public'));

app.get('/:url', (req, res) => {
  controller.getURL(req.params.url)
    .then(address => {
      res.redirect(address);
    })
    .catch(err => {
      console.error(err);
      res.end();
    })
});

app.post('/', (req, res) => {
  // TODO: Add URL validation before continuing to add to store of shortened URLs
  controller.addURL(req.query.url)
    .then(newURL => {
      res.send(`http://localhost:8000/${newURL}`);   // TODO set domain to an environment variable
    })
    .catch((err) => {
      console.error('invalid URL passed in');
      res.end();
    });
});

app.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});