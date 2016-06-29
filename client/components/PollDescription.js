import React from 'react';

function PollDescription(props, context) {
  var instance = Object.create(React.Component.prototype);

  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <div className="poll-description">
        <h1>Let&rsquo;s get Polling!</h1>
        <p>Pollin&rsquo;, Pollin&rsquo;, Pollin&rsquo;....</p>
      </div>
    );
  };

  return instance;
}

export default PollDescription;
