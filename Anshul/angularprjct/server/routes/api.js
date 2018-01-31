module.exports = (function() {
    'use strict';
    const express = require('express');
    const router = express.Router();

    /*load Model*/
    let adminModel = require("../model/admin.js");
    var emails = require('../mail/emailConfig.js');
    let customerModel = require("../model/customer.js");
    let staffModel = require("../model/staff.js");
    let businessModel = require("../model/business.js");
    let planModel = require("../model/plan.js");
    var randomstring = require("randomstring");


    /*-------------------------------START CUSTOMER--------------------------------------------------------*/

    router.get('/customer', function(req, res, next) {
        var response = {};
        customerModel.find({}, null, { sort: { created_at: 1 } }, function(err, customers) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": customers };
            };
            res.json(response);
        });
    });

    router.post('/customer', function(req, res) {
        var response = {};
        var token = randomstring.generate()
        req.body.email_token = token;
        var customer = new customerModel(req.body);
        customer.save(function(err, customer) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": customer };
                emails.emailShoot(customer.email, customer.email, token);
            }
            res.json(response);
        });
    });

    router.put('/customer/:id', function(req, res) {
        var response = {};
        customerModel.findByIdAndUpdate(req.params.id, req.body, function(err, customer) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": customer };
            }
            res.json(response);
        });
    });

    router.get('/customer/:id', function(req, res) {
        var response = {};
        customerModel.findById(req.params.id, function(err, customer) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": customer };
            };
            res.json(response);
        });
    });

    router.delete('/customer/:id', function(req, res) {
        var response = {};
        customerModel.remove({ _id: req.params.id }, function(err, customer) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": customer };
            };
            res.json(response);
        });
    });

    /*-------------------------------END CUSTOMER--------------------------------------------------------*/

    /*-------------------------------START BUSINESS--------------------------------------------------------*/

    router.get('/business-list/:id', function(req, res, next) {
        var response = {};
        businessModel.find({ ownerId: req.params.id }, null, { sort: { created_at: 1 } }, function(err, businesses) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": businesses };
            };
            res.json(response);
        });
    });

    router.post('/business', function(req, res) {
        var response = {};
        var business = new businessModel(req.body);
        business.save(function(err, business) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": business };
            }
            res.json(response);
        });
    });

    router.put('/business/:id', function(req, res) {
        var response = {};
        businessModel.findByIdAndUpdate(req.params.id, req.body, function(err, business) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": business };
            }
            res.json(response);
        });
    });

    router.get('/business/:id', function(req, res) {
        var response = {};
        businessModel.findById(req.params.id, function(err, business) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": business };
            };
            res.json(response);
        });
    });

    router.delete('/business/:id', function(req, res) {
        var response = {};
        businessModel.remove({ _id: req.params.id }, function(err, business) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": business };
            };
            res.json(response);
        });
    });

    /*-------------------------------END BUSINESS--------------------------------------------------------*/

    /*-------------------------------START STAFF--------------------------------------------------------*/

    router.get('/staff', function(req, res, next) {
        var response = {};
        staffModel.find({}, null, { sort: { created_at: 1 } }, function(err, staffs) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": staffs };
            };
            res.json(response);
        });
    });

    router.post('/staff', function(req, res) {
        var response = {};
        var staff = new staffModel(req.body);
        staff.save(function(err, staff) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": staff };
            }
            res.json(response);
        });
    });

    router.put('/staff/:id', function(req, res) {
        var response = {};
        staffModel.findByIdAndUpdate(req.params.id, req.body, function(err, staff) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": staff };
            }
            res.json(response);
        });
    });

    router.get('/staff/:id', function(req, res) {
        var response = {};
        console.log(req.params.id);
        staffModel.findById(req.params.id, function(err, staff) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": staff };
            };
            res.json(response);
        });
    });

    router.delete('/staff/:id', function(req, res) {
        var response = {};
        staffModel.remove({ _id: req.params.id }, function(err, staff) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": staff };
            };
            res.json(response);
        });
    });

    /*-------------------------------END STAFF--------------------------------------------------------*/

    /*-------------------------------START PLAN--------------------------------------------------------*/

    router.get('/plan', function(req, res, next) {
        var response = {};
        planModel.find({}, null, { sort: { created_at: 1 } }, function(err, plans) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plans };
            };
            res.json(response);
        });
    });

    router.post('/plan', function(req, res) {
        var response = {};
        var plan = new planModel(req.body);
        plan.save(function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            }
            res.json(response);
        });
    });

    router.put('/plan/:id', function(req, res) {
        var response = {};
        planModel.findByIdAndUpdate(req.params.id, req.body, function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            }
            res.json(response);
        });
    });

    router.get('/plan/:id', function(req, res) {
        var response = {};
        console.log(req.params.id);
        planModel.findById(req.params.id, function(err, plan) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": plan };
            };
            res.json(response);
        });
    });

    router.delete('/plan/:id', function(req, res) {
        var response = {};
        planModel.remove({ _id: req.params.id }, function(err, plan) {
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