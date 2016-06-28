import React from 'react';
import Navigation from './Navigation';

function Header(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <header>
        <Navigation />
      </header>
    );
  };

  return instance;
}

module.exports = Header;
