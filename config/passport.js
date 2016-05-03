'use strict';

const path = process.cwd();

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const User = require(path + '/models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  // local signup strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField:      'email',
    passwordField:      'password',
    passReqToCallback:  true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({'local.email': email}, function(err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken'));
        } else {
          let newUser = new User();

          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) throw err;

            return done(null, newUser);
          });
        }
      });
    });
  }));

  // local login strategy
  passport.use('local-login', new LocalStrategy({
    usernameField:      'email',
    passwordField:      'password',
    passReqToCallback:  true
  },
  function(req, email, password, done) {
    User.findOne({'local.email': email}, function(err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found'));
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Password doesn\'t match'));
      }

      return done(null, user);
    });
  }));

  // facebook login strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'first_name', 'last_name', 'email'],
    passReqToCallback: true
  },
  function(req, token, refreshToken, profile, done) {
    process.nextTick(function() {
      if (!req.user) {
        User.findOne({'facebook.id': profile.id}, function(err, user) {
          if (err) return done(err);

          if (user) {
            if (!user.facebook.token) {
              user.facebook.token = token;
              user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
              user.facebook.email = profile.emails[0].value;

              user.save(function(err) {
                if (err) throw err;

                return done(null, user);
              });
            }

            return done(null, user);
          } else {
            let newUser = new User();

            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;

            newUser.save(function(err) {
              if (err) throw err;

              return done(null, newUser);
            });
          }
        });
      } else {
        let user = req.user;

        user.facebook.id = profile.id;
        user.facebook.token = token;
        user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        user.facebook.email = profile.emails[0].value;

        user.save(function(err) {
          if (err) throw err;

          return done(null, user);
        });
      }
    });
  }));

  // twitter login strategy
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    process.nextTick(function() {
      if (!req.user) {
        User.findOne({'twitter.id': profile.id}, function(err, user) {
          if (err) return done(err);

          if (user) {
            return done(null, user);

            if (!user.twitter.token) {
              user.twitter.token = token;
              user.twitter.username = profile.username;
              user.twitter.displayName = profile.displayName;

              user.save(function(err) {
                if (err) throw err;

                return done(null, user);
              });
            }
          } else {
            let newUser = new User();

            newUser.twitter.id = profile.id;
            newUser.twitter.token = token;
            newUser.twitter.username = profile.username;
            newUser.twitter.displayName = profile.displayName;

            newUser.save(function(err) {
              if (err) throw err;

              return done(null, newUser);
            });
          }
        });
      } else {
        let user = req.user;

        user.twitter.id = profile.id;
        user.twitter.token = token;
        user.twitter.username = profile.username;
        user.twitter.displayName = profile.displayName;

        user.save(function(err) {
          if (err) throw err;

          return done(null, user);
        });
      }
    });
  }));

  // google login strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  function(req, token, refreshToken, profile, done) {
    process.nextTick(function() {
      if (!req.user) {
        User.findOne({'google.id': profile.id}, function(err, user) {
          if (err) return done(err);

          if (user) {
            return done(null, user);

            if (!user.google.token) {
              user.google.token = token;
              user.google.name = profile.displayName;
              user.google.email = profile.emails[0].value;

              user.save(function(err) {
                if (err) throw err;

                return done(null, user);
              });
            }
          } else {
            let newUser = new User();

            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;

            newUser.save(function(err) {
              if (err) throw err;

              return done(null, newUser);
            });
          }
        });
      } else {
        let user = req.user;

        user.google.id = profile.id;
        user.google.token = token;
        user.google.name = profile.displayName;
        user.google.email = profile.emails[0].value;

        user.save(function(err) {
          if (err) throw err;

          return done(null, user);
        });
      }
    });
  }));

  // github login strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    passReqToCallback: true
  },
  function(req, token, refreshToken, profile, done) {
    process.nextTick(function() {
      if (!req.user) {
        User.findOne({'github.id': profile.id}, function(err, user) {
          if (err) return done(err);

          if (user) {
            return done(null, user);

            if (!user.github.token) {
              user.github.token = token;
              user.github.name = profile.displayName;
              user.github.username = profile.username;

              user.save(function(err) {
                if (err) throw err;

                return done(null, user);
              });
            }
          } else {
            let newUser = new User();

            newUser.github.id = profile.id;
            newUser.github.token = token;
            newUser.github.name = profile.displayName;
            newUser.github.username = profile.username;

            newUser.save(function(err) {
              if (err) throw err;

              return done(null, newUser);
            });
          }
        });
      } else {
        let user = req.user;

        user.github.id = profile.id;
        user.github.token = token;
        user.github.name = profile.displayName;
        user.github.username = profile.username;

        user.save(function(err) {
          if (err) throw err;

          return done(null, user);
        });
      }
    });
  }));

};
