'use strict';

const express = require('express');
const passport = require('passport');
const twitterStrategy = require('passport-twitter');

const app = express();
const path = process.cwd();

require('dotenv').config();
const port = process.env.PORT || 3000;

passport.use(new twitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
}, function(token, tokenSecret, profile, cb) {
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(express.static('static')); // will also set root to index.html
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(req, res) {
  res.sendFile(path + '/static/login.html');
});

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/login'
}), function(req, res) {
  res.redirect('/');
});

app.listen(port, function() {
  console.log('Polling App listening on ' + port + '....');
});
