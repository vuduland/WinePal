var express = require('express');

var router = express.Router();

var db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/all-wines', (req, res, next) => {
  db.wines.findAll({}).then(data => {
    res.json(data);
  });
});

module.exports = router;
