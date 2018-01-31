module.exports = (function() {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');

    /*load Model*/
    let pageModel = require("../models/page.js");

    /*-------------------------------START PLAN--------------------------------------------------------*/

    router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next) {
        var response = {};
        pageModel.find({}, null, { sort: { created_at: 1 } }, function(err, plans) {
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
        var plan = new pageModel(req.body);
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
        pageModel.findByIdAndUpdate(req.params.id, req.body, function(err, plan) {
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
        pageModel.findById(req.params.id, function(err, plan) {
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
        pageModel.remove({ _id: req.params.id }, function(err, plan) {
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