'use strict';

const path = process.cwd();

const isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

const isLoggedOut = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    return next();
  }
}

module.exports = function(app, passport) {
  function getLoginStatus(req) {
    return req.isAuthenticated();
  }

  app.get('/', isLoggedIn, function(req, res) {
    let status = true;
    res.render('pages/index.ejs', {
      status: status,
      title: 'Keep on pollin\''
    });
  });

  app.get('/login', function(req, res) {
    let status = getLoginStatus(req);
    res.render('pages/login.ejs', {
      message: req.flash('loginMessage'),
      status: status,
      title: 'Login'
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup',isLoggedOut, function(req, res) {
    let status = false;
    res.render('pages/signup.ejs', {
      message: req.flash('signupMessage'),
      status: status,
      title: 'Signup'
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, function(req, res) {
    let status = true;
    res.render('pages/profile.ejs', {
      user: req.user,
      status: status,
      title: 'Profile'
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}
