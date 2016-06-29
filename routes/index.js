'use strict';

const path = process.cwd();

const auth = require(path + '/routes/authentication')();

module.exports = function(app) {

  // user api calls
  app.get('/api/user/info', function(req, res) {
    res.json(req.user);
  });

  app.get('/logout', auth.logout);

  // unlinking
  app.get('/auth/unlink/facebook', auth.unlinkFacebook);
  app.get('/auth/unlink/twitter', auth.unlinkTwitter);
  app.get('/auth/unlink/google', auth.unlinkGoogle);
  app.get('/auth/unlink/github', auth.unlinkGithub);

  // React routes
  app.get('/*', function(req, res) {
    res.sendFile(path + '/static/index.html');
  });
}
