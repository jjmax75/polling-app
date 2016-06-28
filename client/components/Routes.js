import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './App';
import PollListScreen from './PollListScreen';
import PollAdd from './PollAdd';

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route path='/polls' component={App}>
      <IndexRoute component={PollListScreen} />
      <Route path='/polls/new' component={PollAdd} />
    </Route>
  </Router>
), document.getElementById('root')
);
