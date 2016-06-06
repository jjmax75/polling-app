'use strict';

const passport = require('passport');

const authentication = function authentication() {

  let o = Object.create(Object.prototype);

  o.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  };

  o.login = function(req, res) {
    let status = req.isAuthenticated();
    res.render('pages/login.ejs', {
      message: req.flash('loginMessage'),
      status: status,
      title: 'Login'
    });
  };

  o.facebookLogin = passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  });

  o.twitterLogin = passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  });

  o.googleLogin = passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  });

  o.githubLogin = passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  });

  o.facebookAuthorise = passport.authorize('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  });

  o.twitterAuthorise = passport.authorize('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  });

  o.googleAuthorise = passport.authorize('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  });

  o.githubAuthorise = passport.authorize('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  });

  o.unlinkFacebook = function(req, res) {
    let user = req.user;
    user.facebook = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  };

  o.unlinkTwitter = function(req, res) {
    let user = req.user;
    user.twitter = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  };

  o.unlinkGoogle = function(req, res) {
    let user = req.user;
    user.google = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  };

  o.unlinkGithub = function(req, res) {
    let user = req.user;
    user.github = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  };

  o.logout = function(req, res) {
    req.logout();
    res.redirect('/');
  };

  return o;

};

module.exports = authentication;
