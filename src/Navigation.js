import React from 'react';
import { IndexLink, Link } from 'react-router';

function Navigation(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <ul>
        <li><IndexLink to="/polls" activeClassName="active">All Polls</IndexLink></li>
        <li><Link to="/polls/new" activeClassName="active">New Poll</Link></li>
      </ul>
    );
  };

  return instance;
}

module.exports = Navigation;
