import React from 'react';

function PollSingle(props, context) {
  var instance = Object.create(React.Component.prototype);

  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <h1>This is a single Poll</h1>
    );
  };

  return instance;
}

export default PollSingle;
