'use strict';

const mongoose = require('mongoose');

const votesSchema = mongoose.Schema({

  id:           String,
  pollId:       String,
  votes:        []

});

module.exports = mongoose.model('Votes', votesSchema);
