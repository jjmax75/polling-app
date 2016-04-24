'use strict';

var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('static'));

app.get('/', function(req, res) {
  res.send('index.html');
});

app.listen(port, function() {
  console.log('Polling App listening on ' + port + '....');
});
