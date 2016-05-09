import React from 'react';

function PollNode(props, context) {
  var instance = Object.create(React.Component.prototype);

  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <li>{instance.props.title}</li>
    );
  };

  return instance;
}

module.exports = PollNode;
