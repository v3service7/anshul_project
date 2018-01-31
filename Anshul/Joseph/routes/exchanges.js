module.exports = (function() {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    var request = require('request');

    /*load Model*/
    let exchangeModel = require("../models/exchange.js");
    let exchangeapiModel = require("../models/exchangeapi.js");

    /*-------------------------------START EXCHANGE--------------------------------------------------------*/

    router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next) {
        var response = {};
        exchangeModel.find({}, null, { sort: { created_at: 1 } }).populate('user').populate('exchangeName').exec(function(err, plans) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plans };
            };
            res.json(response);
        });
    });    
    

    router.post('/', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        var API_KEY=req.body.apikey
        var plan = new exchangeModel(req.body);
        exchangeModel.find({ "exchangeName": req.body.exchangeName,"user": req.body.user}).populate('exchangeName').exec(function (err, data) {
            if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else{ 
                if(data.length>0){
                    response = {"error" : true,"message" : "Data already exits"};
                }else{
                     exchangeapiModel.find({_id: req.body.exchangeName}).exec(function (err, data) {
                        if (err) {
                            response = {"error" : true,"message" : "Error fetching data"};
                        } else{
                            request(data[0].exchangeUrl+"?apikey="+API_KEY, function (error, response, body) {
                            var abc = JSON.parse(body);
                                if(abc.success === false){
                                    response = { "error": true, "message": "Api not matched" };
                                     res.json(response);
                                }else{
                                    plan.save(function(err, plan) {
                                        if (err) {  
                                            response = { "error": true, "message": err };
                                        } else {
                                            response = { "error": false, "message": plan };
                                        }
                                         res.json(response);
                                     });
                                }
                            });
                        }
                    });              
                }
            };
        });         
    });

    /*router.put('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        exchangeModel.findByIdAndUpdate(req.params.id, req.body, function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            }
            res.json(response);
        });
    });*/
     router.get('/custexchange/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        exchangeModel.find({"user":req.params.id}).populate('exchangeName').exec(function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            };
            res.json(response);
        });
    });


    router.put('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        exchangeModel.find({"exchangeName": req.body.exchangeName,"user": req.body.user}).exec(function (err, data) {
            if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
                res.json(response);
            } else{
                if(data.length>0){
                    exchangeModel.find({"_id":req.params.id,"exchangeName": req.body.exchangeName,"user": req.body.user}).exec(function (err, data) {
                        if (err) {
                            response = {"error" : true,"message" : "Error fetching data"};
                            res.json(response);
                        } else{
                            if(data.length>0){
                                exchangeModel.findByIdAndUpdate(req.params.id, req.body, function(err, plan) {
                                    if (err) {
                                        response = { "error": true, "message": err };
                                    } else {
                                        response = { "error": false, "message": plan };
                                    }
                                });                           
                            }else{
                                response = {"error" : true,"message" : "Data already exits"};  
                            }
                            res.json(response);
                        }
                    });
                }else{
                    exchangeModel.findByIdAndUpdate(req.params.id, req.body, function(err, plan) {
                        if (err) {
                            response = { "error": true, "message": err };
                        } else {
                            response = { "error": false, "message": plan };
                        }
                        res.json(response);
                    });
                }
            };
        
        });
    });
    
    router.get('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        exchangeModel.findById(req.params.id, function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            };
            res.json(response);
        });
    });

    router.delete('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        exchangeModel.remove({ _id: req.params.id }, function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            };
            res.json(response);
        });
    });

    /*-------------------------------END EXCHANGE--------------------------------------------------------*/

    return router;
})();