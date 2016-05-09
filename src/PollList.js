import React from 'react';

import PollNode from './PollNode.js';

function PollList(props, context) {
  var instance = Object.create(React.Component.prototype);

  instance.props = props;
  instance.context = context;

  let pollNodes = instance.props.data.map(function(poll) {
    return (
      <PollNode key={poll.id} title={poll.title} />
    );
  });

  instance.render = () => {
    return (
      <div className="poll-list">
        <ul>
          {pollNodes}
        </ul>
      </div>
    );
  };

  return instance;
}

module.exports = PollList;
