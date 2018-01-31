var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var jwt    = require('jsonwebtoken');
var cors = require('cors');
/*var multer = require('multer');
const csv=require('csvtojson');*/
var localStrategy = require('passport-local' ).Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var officers = require('./routes/officers');
var cityModel  =  require("./model/City.js");
var User = require('./model/User.js');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var db  = mongoose.connect('mongodb://localhost:27017/securitydb');
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.set('superSecret', 'securityURI');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var apiRoutes = express.Router();
//app.use('/users', users);
var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEN1c3RvbWVyIjo5MCwiQ3VzdG9tZXJGbmFtZSI6IlQxRm5hbWUiLCJDdXN0b21lckxuYW1lIjoiVDFMbmFtZSIsIkN1c3RvbWVyVGVsbm8iOiIxMTExMTExMTExIiwiQ3VzdG9tZXJFbWFpbCI6IlQxQHppaXB0cmFuc2l0LmNvbSIsIkN1c3RvbWVyUGFzc3dvcmQiOiIkMmEkMTAkUG81R0JRUlRHWUpPYU9yaU9OZXE3T1lSeTI0Y1hPZktuQ0NMMy4xaFVTaE56WS9hMDVEQS4iLCJDdXN0b21lckdlbmRlciI6Ik5VTEwiLCJDdXN0b21lckZhY2Vib29rSWQiOiJOVUxMIiwiQ3VzdG9tZXJQaWN0dXJlUGF0aCI6IjAuMDAiLCJDdXN0b21lcklzU3R1ZGVudCI6MCwiQ3VzdG9tZXJWZXJpZnlUZWxubyI6MCwiQ3VzdG9tZXJWZXJpZnlFbWFpbCI6MSwiQ3VzdG9tZXJJc0luYWN0aXZlIjowLCJDdXN0b21lclZlcmlmaWNhdGlvblRva2VuIjpudWxsLCJpYXQiOjE1MDA0MTAyMzQsImV4cCI6MTUwMzAwMjIzNH0.mPlmkuFDISGyjUl6GzELjKTCrAfmdjtuSdtrF45yLvY';


apiRoutes.post('/users/register', function(req, res) {
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


apiRoutes.post('/users/login', function(req, res, next) {
    var userToken = req.headers.auth;
    if (token == userToken) {
        User.find({username:req.body.username,password:req.body.password},function (err,user) {
            if (user.length > 0) {               
              jwt.verify(user[0].custoken, app.get('superSecret'), {expiration: -36000000000000000000000000}, function(err, decoded) {

              });
              user[0].custoken = '';
              var token = jwt.sign(user[0], app.get('superSecret'), {
                      expiresIn: 3600 // expires in 1 hours
                  });
              user[0].custoken = token;
              //console.log(user[0])
              User.findByIdAndUpdate(user[0]._id, user[0], function(err, userU) {
                  User.findById(user[0]._id, function(err, userIIII) {
                      if(err) {
                          response = {"error" : true,"message" : err};
                      } else {
                          response = {"error" : false,"message" : userIIII};
                      }
                      return res.json(response);
                  });
              });
          }
          else{
                return res.json({'message': 'Invalid Username/Password'
                });
          }
        });
    }else{
        return res.status(403).json({
            'message': 'Unauthorize'
        });
    };
});

apiRoutes.get('/users/logout', function(req, res) {
    var userToken = req.headers['x-access-token'];
    if (userToken != '' && typeof userToken != 'undefined') {
        User.find({custoken : userToken}, function (err,user) {
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

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;  
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.'
    });
    
  }
});
app.use('/', apiRoutes);
app.use('/', routes);
app.use('/officers', officers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
