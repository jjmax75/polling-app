'use strict';

const path = process.cwd();

const Polls = require(path + '/models/polls');

module.exports = function(app) {

  // user api calls
  app.get('/api/user/info', function(req, res) {
    res.json(req.user);
  });

  app.get('/api/get/polls', function(req, res) {
    Polls.find(function(err, polls) {
      if (err) return console.error(err);
      res.json(polls);
    });
  });

  // React routes
  app.get('/*', function(req, res) {
    res.sendFile(path + '/static/index.html');
  });
}
