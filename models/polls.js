'use strict';

const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({

  id:           String,
  title:        String,
  choices:      []

});

module.exports = mongoose.model('Poll', pollSchema);
