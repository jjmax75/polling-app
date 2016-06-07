import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, browserHistory} from 'react-router';

const PollListScreen = require('./PollListScreen');
const PollAdd = require('./PollAdd');

const getUserInfo = new XMLHttpRequest();
getUserInfo.open('GET', '/api/user/info', true);
getUserInfo.onreadystatechange = function () {
  if (getUserInfo.readyState != 4 || getUserInfo.status != 200) return;
  renderApp(getUserInfo.responseText);
};
getUserInfo.send();

const renderApp = function renderApp(userInfo) {
  console.log(userInfo);
  ReactDOM.render(
    (
    <Router history={browserHistory}>
      <Route path='/polls' component={PollListScreen} />
      <Route path='/polls/new' component={PollAdd} />
    </Router>
    ), document.getElementById('app')
  );
};
