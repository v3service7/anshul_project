var express = require('express');
var router = express.Router();
var socket = require('./socket'); 

/* GET home page. */
router.get('/server', function(req, res, next) {
	if(req.query.username){
		socket.log({data : req.query.username});
	}	
  res.render('index', { title: 'Express' });
});

module.exports = router;
