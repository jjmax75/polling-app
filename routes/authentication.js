'use strict';

const authentication = function authentication() {

  let o = Object.create(Object.prototype);

  o.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  };

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
