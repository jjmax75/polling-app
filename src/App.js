import React from 'react';

import Navigation from './Navigation.js';

function App(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <div className="poll-app">
        <Navigation />
        {instance.props.children}
      </div>
    );
  };

  return instance;
}

module.exports = App;
