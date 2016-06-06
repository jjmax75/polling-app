'use strict';

const authentication = function authentication() {

  let o = Object.create(Object.prototype);

  o.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  return o;

};

module.exports = authentication;
