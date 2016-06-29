import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import App from './components/App';
import PollListScreen from './components/PollListScreen';
import PollAdd from './components/PollAdd';
import PollSingle from './components/PollSingle';

render(
  (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={PollListScreen} />
          <Route path='/poll/view/:pollId' component={PollSingle}></Route>
          <Route path='/polls/new' component={PollAdd} />
        </Route>
      </Router>
    </Provider>
), document.getElementById('root'));
