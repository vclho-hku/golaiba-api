const express = require('express')
var admin = require('firebase-admin');
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({"a": "abc"})
})

module.exports = router;