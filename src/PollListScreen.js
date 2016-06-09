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

// temp data object for building before db is hooked up
let polls = [
  {id: 1, title: 'Who should be president?'},
  {id: 2, title: 'What\'s your favourite colour?'},
  {id: 3, title: 'does React make your head want to explode?'},
  {id: 4, title: 'In the land of the blind the one eyed man is king'},
  {id: 5, title: 'That\s a bit too philosophical at this late hour'},
];

function PollListScreen(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <div className="poll-list">
        <PollDescription />
        <PollList data={polls} />
      </div>
    );
  };

  return instance;
}

module.exports = PollListScreen;
