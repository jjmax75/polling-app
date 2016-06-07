import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, browserHistory} from 'react-router';

const PollListScreen = require('./PollListScreen');
const PollAdd = require('./PollAdd');

// building componenets without using javascript classes
// using https://gist.github.com/jquense/47bbd2613e0b03d7e51c
// see eric elliott and mattias p johansson
// this approach use plain old objects - plainoldobjects.jsx
// https://gist.github.com/jquense/47bbd2613e0b03d7e51c#file-1-plainoldobjects-jsx
// works beautifully, makes sense, where's the gotcha....? o.O
ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route path='/polls' component={PollListScreen} />
    <Route path='/polls/new' component={PollAdd} />
  </Router>
  ), document.getElementById('app')
);
