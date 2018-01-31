module.exports = (function() {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');

    /*load Model*/
    let purchaseplanModel = require("../models/purchaseplan.js");

    /*-------------------------------START EXCHANGE--------------------------------------------------------*/
   
    router.get('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        purchaseplanModel.find({"user":req.params.id}).populate('user').populate('plan').exec(function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            };
            res.json(response);
        });
    });

    router.get('/', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        purchaseplanModel.find({}).populate('user').populate('plan').exec(function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            };
            res.json(response);
        });
    });

     router.post('/', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        var plan = new purchaseplanModel(req.body);
        plan.save(function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            }
            res.json(response);
        });
    });

    router.put('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        purchaseplanModel.findOneAndUpdate({"user":req.params.id,"status":"Pending"}, req.body).exec(function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            }
            res.json(response);
        });
    });
    /*-------------------------------END EXCHANGE--------------------------------------------------------*/

    return router;
})();