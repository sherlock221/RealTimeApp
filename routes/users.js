var express = require('express');
var router = express.Router();


router.get('/test', function(req, res) {
    console.log("user...");
  res.send('respond with a resource');
});

module.exports = router;
