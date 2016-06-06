'use strict';

const path = process.cwd();

const auth = require(path + '/routes/authentication')();

module.exports = function(app, passport) {

  // React router
  app.get('/polls*', auth.isLoggedIn, function(req, res) {
    let status = true;
    res.render('pages/index.ejs', {
      status: status,
      title: 'Keep on pollin\''
    });
  });

  app.get('/', auth.isLoggedIn, function(req, res) {
    res.redirect('/polls');
  });

  // TODO - Change this to React
  app.get('/profile', auth.isLoggedIn, function(req, res) {
    let status = true;
    res.render('pages/profile.ejs', {
      user: req.user,
      status: status,
      title: 'Profile'
    });
  });

  app.get('/login', auth.login);
  app.get('/logout', auth.logout);

  // login
  app.get('/login/facebook', passport.authenticate('facebook'));
  app.get('/login/twitter', passport.authenticate('twitter'));
  app.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  app.get('/login/github', passport.authenticate('github', {scope: ['user:email']}));

  // login callbacks
  app.get('/auth/facebook/callback', auth.facebookLogin);
  app.get('/auth/twitter/callback', auth.twitterLogin);
  app.get('/auth/google/callback', auth.googleLogin);
  app.get('/auth/github/callback', auth.githubLogin);

  // authorise
  app.get('/connect/facebook', passport.authorize('facebook'));
  app.get('/connect/twitter', passport.authorize('twitter'));
  app.get('/connect/google', passport.authorize('google', {scope: ['profile', 'email']}));
  app.get('/connect/github', passport.authorize('github', {scope: ['user:email']}));

  // authorise callbacks
  app.get('/connect/facebook/callback', auth.facebookAuthorise);
  app.get('/connect/twitter/callback', auth.twitterAuthorise);
  app.get('/connect/google/callback', auth.googleAuthorise);
  app.get('/connect/github/callback', auth.githubAuthorise);

  // unlinking
  app.get('/unlink/facebook', auth.unlinkFacebook);
  app.get('/unlink/twitter', auth.unlinkTwitter);
  app.get('/unlink/google', auth.unlinkGoogle);
  app.get('/unlink/github', auth.unlinkGithub);

}
