var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/dialogflow', function(req, res, next) {
  console.log(req);
  //res.send({req: JSON.stringify(req)});
});

module.exports = router;
