import React from 'react';

function Footer(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <footer>
        &copy; Copyright 2016 - Se&aacute;n Behan, <a href="http://www.boxitoff.com">Box It Off</a>
      </footer>
    );
  };

  return instance;
}

module.exports = Footer;
