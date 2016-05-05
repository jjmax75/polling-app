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

  // authorise local login
  app.get('/connect/local', function(req, res) {
    res.render('pages/connect-local.ejs', {message: req.flash('loginMessage')});
  });

  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/connect/local',
    failureFlash: true
  }));

  // authorise facebook
  app.get('/connect/facebook', passport.authorize('facebook'));

  app.get('/connect/facebook/callback', passport.authorize('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // authorise twitter
  app.get('/connect/twitter', passport.authorize('twitter'));

  app.get('/connect/twitter/callback', passport.authorize('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // authorise google
  app.get('/connect/google', passport.authorize('google', {scope: ['profile', 'email']}));

  app.get('/connect/google/callback', passport.authorize('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // authorise github
  app.get('/connect/github', passport.authorize('github', {scope: ['user:email']}));

  app.get('/connect/github/callback', passport.authorize('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // unlink local
  app.get('/unlink/local', function(req, res) {
    let user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // unlink facebook
  app.get('/unlink/facebook', function(req, res) {
    let user = req.user;
    user.facebook = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // unlink twitter
  app.get('/unlink/twitter', function(req, res) {
    let user = req.user;
    user.twitter = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // unlink google
  app.get('/unlink/google', function(req, res) {
    let user = req.user;
    user.google = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // unlink github
  app.get('/unlink/github', function(req, res) {
    let user = req.user;
    user.github = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}
