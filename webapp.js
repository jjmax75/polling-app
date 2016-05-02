'use strict';

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');

require('dotenv').config();
const port = process.env.PORT || 3000;
const path = process.cwd();

mongoose.connect(process.env.MONGO_URI);

require(path + '/config/passport')(passport);

app.use('/css', express.static(path + '/static/css'));
app.use('/js', express.static(path + '/static/js'));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view-engine', 'ejs');

// setup passport
app.use(session({
  secret: 'thisishowwedoitttttt',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require(path + '/routes/index.js')(app, passport);

app.listen(port, function() {
  console.log('Polling App listening on ' + port + '....');
});
