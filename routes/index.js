var express = require('express');
var router = express.Router();

/* 主页. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* 登陆. */
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

/*  后台. */
router.get('/admin', function(req, res, next) {
  res.render('admin', {});
});

module.exports = router;
