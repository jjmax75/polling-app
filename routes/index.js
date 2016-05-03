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

  // facebook routes
  app.get('/login/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // twitter routes
  app.get('/login/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // google routes
  app.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // github routes
  app.get('/login/github', passport.authenticate('github', {scope: ['user:email']}));

  app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}
