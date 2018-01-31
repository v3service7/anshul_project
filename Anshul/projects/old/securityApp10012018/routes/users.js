var express = require('express');
var router = express.Router();
var passport = require('passport');
var crypto = require('crypto');
var jwt    = require('jsonwebtoken');

var User = require('../model/User.js');
var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEN1c3RvbWVyIjo5MCwiQ3VzdG9tZXJGbmFtZSI6IlQxRm5hbWUiLCJDdXN0b21lckxuYW1lIjoiVDFMbmFtZSIsIkN1c3RvbWVyVGVsbm8iOiIxMTExMTExMTExIiwiQ3VzdG9tZXJFbWFpbCI6IlQxQHppaXB0cmFuc2l0LmNvbSIsIkN1c3RvbWVyUGFzc3dvcmQiOiIkMmEkMTAkUG81R0JRUlRHWUpPYU9yaU9OZXE3T1lSeTI0Y1hPZktuQ0NMMy4xaFVTaE56WS9hMDVEQS4iLCJDdXN0b21lckdlbmRlciI6Ik5VTEwiLCJDdXN0b21lckZhY2Vib29rSWQiOiJOVUxMIiwiQ3VzdG9tZXJQaWN0dXJlUGF0aCI6IjAuMDAiLCJDdXN0b21lcklzU3R1ZGVudCI6MCwiQ3VzdG9tZXJWZXJpZnlUZWxubyI6MCwiQ3VzdG9tZXJWZXJpZnlFbWFpbCI6MSwiQ3VzdG9tZXJJc0luYWN0aXZlIjowLCJDdXN0b21lclZlcmlmaWNhdGlvblRva2VuIjpudWxsLCJpYXQiOjE1MDA0MTAyMzQsImV4cCI6MTUwMzAwMjIzNH0.mPlmkuFDISGyjUl6GzELjKTCrAfmdjtuSdtrF45yLvY';

router.post('/register', function(req, res) {
    var userToken = req.headers.auth;
    //console.log();
    if (token == userToken) {
        var response={};
        var userObj = new User(req.body);
        userObj.save(function(err){
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            return res.status(200).json(response);
        });
    }else{
        return res.status(403).json({
            'message': 'Unauthorize'
        });
    };
});

router.post('/login', function(req, res, next) {
    var userToken = req.headers.auth;
    if (token == userToken) {
        User.find({username:req.body.username,password:req.body.password},function (err,user) {
            var token = jwt.sign(user[0], 'securityURI', {
                    expiresIn: 3600 // expires in 1 hours
                });
            user[0].custoken = token;
            console.log(user[0])
            User.findByIdAndUpdate(user[0]._id, user[0], function(err, userU) {
                User.findById(user[0]._id, function(err, userIIII) {
                    if(err) {
                        response = {"error" : true,"message" : err};
                    } else {
                        response = {"error" : false,"message" : userIIII};
                    }
                    return res.status(200).json(response);
                });
            });
        });
    }else{
        return res.status(403).json({
            'message': 'Unauthorize'
        });
    };
});

router.get('/logout', function(req, res) {
    var userToken = req.headers.auth;
    //console.log();
    if (userToken != '' && typeof userToken != 'undefined') {
        User.find({custoken:userToken},function (err,user) {
            if (user.length > 0) {
                user[0]['custoken'] = '';
                User.findByIdAndUpdate(user[0]._id, user[0], function(err, userU) {
                    if(err) {
                        response = {"error" : true,"message" : err};
                    } else {
                        response = {"error" : false,"message" : 'Bye'};
                    }
                    return res.status(200).json(response);
                });  
            }else{
                return res.status(403).json({
                    'message': 'Unauthorize'
                });
            };
        });
    }else{
        return res.status(403).json({
            'message': 'Unauthorize'
        });
    };
});

router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        data:req.user,
        status: true
    });
});

router.get('/', function(req, res) {
    User.find({},function (err,user) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : user};
        }
        return res.status(200).json(response);
    });
});

module.exports = router;