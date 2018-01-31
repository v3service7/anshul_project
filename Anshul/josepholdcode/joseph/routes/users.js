const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config/database');
const emails = require('../mail/emailConfig.js');


// User Login
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    //console.log(user);
    if(user.role != "Admin"){
      return res.json({success: false, msg: 'Not Authorized'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
		  const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 3600 // 1 hour
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            phonenumber: user.phonenumber,
            dob: user.dob,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});


// User Profile based on Session
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// User List
router.get('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {    
    var response={};
    User.find({role: "User"}, null, {sort: {created_at: 1}}, (err, data) => {
        if (err) {
            response = {"success" : false,"message" : "Error fetching data"};
        } else{
            response = {"success" : true,"message" : data};
        };        
        res.json(response);
    }); 
});


// User Add
router.post('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    dob: req.body.dob,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    status: true
  });

  User.addUser(newUser, (err, user) => {
    if(err){          
      res.json({success: false, msg:err});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
}); 


// User Update
router.put('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {    
    var response={};
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
            if(err) {
                response = {"success" : false,"message" : err};
            } else {
                response = {"success" : true,"message" : user};
            }
            res.json(response);
        });
});

// User Change Password
router.put('/changePassword/:id', passport.authenticate('jwt', {session:false}), (req, res) => {    
    var response={};
    User.findById(req.params.id, (err, user) => {
        if (user.password == req.body.password) {
            var newObject = {};
            newObject.password = req.body.newpassword;
            User.findByIdAndUpdate(req.params.id, newObject, (err, customer) => {
                if (err) {
                    response = { "error": true, "message": err };
                } else {
                    response = { "error": false, "message": "Password changed Successfully " };
                }
                res.json(response);
            });
        } else {
            response = { "error": true, "message": "Password Incorect" };
            res.json(response);
        };
    });
});


router.post('/forget-password', function(req, res, next) {
    var response = {};
    User.find({ email: req.body.email }, function(err, data) {
        if (err) {
            req.flash('error', 'something went wrong!');
        } else {
            if (data.length > 0) {
                emails.forgetEmailShoot(data[0],'admin');
                res.json({ error: false, message: 'Email sent Successfully' });
            } else {
                res.json({ error: true, message: 'Email id does not exist' });
            }
        };
    });
});

router.put('/customer-change-password/:id', function(req, res) {
        var response = {};        
        
        User.findByIdAndUpdate(req.params.id, req.body, function(err, customer) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": "Password changed Successfully " };
            }
            res.json(response);
        });

    });

// Get User Profile by id
router.get('/:id', passport.authenticate('jwt', {session:false}), (req,res) => {    
    var response={};
    User.findById(req.params.id, (err,data) => {
        if (err) {
            response = {"success" : false,"message" : "Error fetching data"};
        } else{
            response = {"success" : true,"message" : data};
        };
        res.json(response);
    }); 
});


// Delete User by id
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req,res) => {    
    var response={};
    User.remove({_id:req.params.id}, (err,data) => {
        if (err) {
            response = {"success" : false,"message" : "Error fetching data"};
        } else{
            response = {"success" : true,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});

module.exports = router;
