var express = require('express');
var router = express.Router();
var signal = require('./signalr');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('view');  
});
router.post('/server', function(req, res, next) {
	signal.log({data : "send"});
	res.render('index', { time1: 'new Date()' });
	res.send('You sent the name');
});
router.get('/client', function(req, res, next) {
	res.render('index', { time: 'new Date()' });
});
module.exports = router;
