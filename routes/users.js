
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users',{title:' Special Users list'});
});

router.get('/detail', function(req, res, next) {
  res.send('Users details');
});


module.exports = router;
