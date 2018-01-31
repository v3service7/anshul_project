module.exports = (function() {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');

    /*load Model*/
    let exchangeapiModel = require("../models/exchangeapi.js");

    /*-------------------------------START PLAN--------------------------------------------------------*/

    router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next) {
        var response = {};
        exchangeapiModel.find({}, null, { sort: { created_at: 1 } }, function(err, plans) {
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
        var exchanageapi = new exchangeapiModel(req.body);
        exchanageapi.save(function(err, plan) {
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
        exchangeapiModel.findByIdAndUpdate(req.params.id, req.body, function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            }
            res.json(response);
        });
    });

    router.get('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        exchangeapiModel.findById(req.params.id, function(err, plan) {
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
        exchangeapiModel.remove({ _id: req.params.id }, function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            };
            res.json(response);
        });
    });

    /*-------------------------------END PLAN--------------------------------------------------------*/

    return router;
})();