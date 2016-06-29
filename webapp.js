'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const morgan = require('morgan');

require('dotenv').config();
const port = process.env.PORT || 3000;
const path = process.cwd();

mongoose.connect(process.env.MONGO_URI);

app.use('/css', express.static(path + '/static/css'));
app.use('/js', express.static(path + '/static/js'));
app.use('/fonts', express.static(path + '/static/fonts'));

app.use(morgan('dev'));

require(path + '/routes/index.js')(app);

app.listen(port, function() {
  console.log('Polling App listening on ' + port + '....');
});
