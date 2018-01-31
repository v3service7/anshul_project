var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../model/User.js');

router.post('/register', function(req, res) {
    User.register(new User(req.body), req.body.password, function(err, account) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({
                status: 'Registration successful!'
            });
        });
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, User, info) {
        if (err) {
            return next(err);
        }
        if (!User) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(User, function(err) {
            if (err) {
                return res.status(500).json({
                err: 'Could not log in User'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
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

module.exports = router;