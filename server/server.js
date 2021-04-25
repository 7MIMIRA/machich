require('dotenv').config();
const https = require("https");
const fs = require("fs");
const express = require('express');
const app = express();
const keyFilePath = process.env.LOCAL_DEV_KEY || "/etc/letsencrypt/live/machich.app/privkey.pem";
const certFilePath = process.env.LOCAL_DEV_CERT || "/etc/letsencrypt/live/machich.app/fullchain.pem";

const options = {
  key: fs.readFileSync(keyFilePath),
  cert: fs.readFileSync(certFilePath)
};

app.use(express.static('public'));
app.use(express.json());

app.use(require('./routes/index.js'));

app.listen(80, () => {
  console.log(`listening on localhost:80`);
});

https.createServer(options, app).listen(443);