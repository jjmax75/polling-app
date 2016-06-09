import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, browserHistory} from 'react-router';

const PollListScreen = require('./PollListScreen');
const PollAdd = require('./PollAdd');

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route path='/polls' component={PollListScreen} />
    <Route path='/polls/new' component={PollAdd} />
  </Router>
  ), document.getElementById('app')
);
