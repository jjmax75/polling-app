'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  facebook: {
    id:           String,
    token:        String,
    email:        String,
    name:         String
  },

  twitter: {
    id:           String,
    token:        String,
    displayName:  String,
    username:     String
  },

  google: {
    id:           String,
    token:        String,
    email:        String,
    name:         String
  },

  github: {
    id:           String,
    token:        String,
    username:     String,
    name:         String
  }

});

module.exports = mongoose.model('User', userSchema);
