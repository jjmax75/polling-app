import React from 'react';

import PollDescription from './PollDescription';
import PollList from './PollList';

// const getUserInfo = new XMLHttpRequest();
// getUserInfo.open('GET', '/api/user/info', true);
// getUserInfo.onreadystatechange = function () {
//   if (getUserInfo.readyState != 4 || getUserInfo.status != 200) return;
//   console.log(getUserInfo.responseText);
// };
// getUserInfo.send();

function PollListScreen(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <div className="poll-list">
        <PollDescription />
        <PollList data={instance.props.polls} />
      </div>
    );
  };

  return instance;
}

export default PollListScreen;
