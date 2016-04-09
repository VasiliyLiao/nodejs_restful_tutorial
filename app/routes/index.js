const router = require('express').Router();

router.get('/', function(req, res) {
  res.send('how to use nodejs to build a restful api server.');
});

module.exports = router;
