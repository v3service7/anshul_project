var express = require('express');
var router = express.Router();
var passport = require('passport');

var Customer = require('../model/Customer.js');
var Friend = require('../model/Friends.js');
var Message = require('../model/Message.js');
var Report = require('../model/Report.js');
var Notification = require('../model/Notification.js');

var OpenTok = require('opentok'),
opentok = new OpenTok('45956382', 'e8a3c7252bc4f514867b16708d5dfa63622c8a39');

router.post('/',function(req,res){
	var response = {};
	var customer = new Customer(req.body);
	Customer.find({email:req.body.email},function(err, emailmatch){
		if(emailmatch.length > 0){
			response = {"error" : true,"message" : "Already exist"};
       		res.json(response);
		}else{
			customer.save(function(err, data){
		        if(err) {
		           response = {"error" : true,"message" : err};
		        } else {
		           response = {"error" : false,"message" : data};
		        }
		        res.json(response);
		    });
		}
	});
});

router.get('/featured',function(req,res,next){
	var response ={};
	Customer.find({"featured":true, activate: true}).limit(6).populate("country").exec(function(err,data){
		if(err){
			response = {"error" : true, "message" : "Error fetching data"};
		}else{
			response = {"error" : false, "message" : data};
		};
		res.json(response);
	});
});

router.get('/adminreport',function(req, res, next){
	var response = {};
	Report.find({},function(err, user){
		if(err){
			response = {"error": true,"message": err};
		}else{
			response = {"error": false,"message": user};
		}
		res.json(response);
	});
});
router.get('/initnotifications/:id', function(req, res, next) {    
     var response = {};
     Notification.find({ToId : req.params.id, isread: false}).populate("ToId").populate("FromId").sort({created_at: -1}).exec(function(err, notificatons){
            if(err) {
              //console.log(err);
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : notificatons};
            }
            res.json(response);
        }); 
});

router.get('/initnotifications/:id', function(req, res, next){
	var response = {};
	Notification.find({ToId:req.params.id,isread: false}).populate("ToId")
})