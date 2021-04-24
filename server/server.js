const https = require("https");
const fs = require("fs");
const express = require('express');
const app = express();


const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/machich.app/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/machich.app/fullchain.pem")
};

app.use(express.static('public'));
app.use(express.json());

app.use(require('./routes/index.js'));

app.listen(80, () => {
  console.log(`listening on localhost:80`);
});

https.createServer(options, app).listen(443);