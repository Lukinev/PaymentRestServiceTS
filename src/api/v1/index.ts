var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req: any, res: any, next: any) {
  res.send('<h1>Wrong route</h1>');
});

module.exports = router;
