import React from 'react';

function Footer(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">&copy; Copyright 2016 - Sean Behan, <a href="http://www.boxitoff.com">Box It Off</a></p>
        </div>
      </footer>
    );
  };

  return instance;
}

export default Footer;
