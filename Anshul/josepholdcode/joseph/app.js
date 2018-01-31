const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');
const users = require('./routes/users');
const pages = require('./routes/pages');
const plans = require('./routes/plans');
const exchanges = require('./routes/exchanges');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on("connected", () => {
	console.log('Connected to Database '+config.database);	
});

// On Error
mongoose.connection.on("error", (err) => {
	console.log('Connected to Database '+err);	
});

const app = express();

// Port Number
const port = 3000;

// CORS Middleware to access API from outside
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware to get form content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/plan', plans);
app.use('/page', pages);
app.use('/exchange', exchanges);

// Index Route
app.get('/', (req, res) => {
	res.send('Invalid End Point');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
	console.log('Server started on port '+port);
});


