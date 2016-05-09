'use strict';

const express = require('express'); // web framework
const passport = require('passport'); // middleware for authentication
const mongoose = require('mongoose'); // mongo driver
const app = express();

const morgan = require('morgan'); // http logger
const flash = require('connect-flash'); // flash messages
const bodyParser = require('body-parser'); // populates req.body with post params
const session = require('express-session'); // session middleware
const redis = require('redis'); // cookie store
const RedisStore = require('connect-redis')(session);

const RedisClient = redis.createClient();
RedisClient.on('error', function(err) {
  console.log('Redis error: ' + err);
});

require('dotenv').config();
const port = process.env.PORT || 3000;
const path = process.cwd();

mongoose.connect(process.env.MONGO_URI);

require(path + '/config/passport')(passport);

app.use('/css', express.static(path + '/static/css'));
app.use('/js', express.static(path + '/static/js'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view-engine', 'ejs');

// setup passport
app.use(session({
  store: new RedisStore({
    client: RedisClient
  }),
  secret: 'thisishowwedoitttttt',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require(path + '/routes/index.js')(app, passport);

app.listen(port, function() {
  console.log('Polling App listening on ' + port + '....');
});
