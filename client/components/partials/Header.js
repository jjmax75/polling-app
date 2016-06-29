import React from 'react';
import Navigation from './Navigation';

function Header(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <header>
        {instance.props.idToken ? <span>{instance.props.idToken}</span> : null}
        <Navigation lock={instance.props.lock} />
      </header>
    );
  };

  return instance;
}

module.exports = Header;
