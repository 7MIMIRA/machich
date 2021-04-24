const express = require('express');
const router = express.Router();

router.use(require('./get.js'))
router.use(require('./post.js'))

module.exports = router;