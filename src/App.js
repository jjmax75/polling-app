import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// temp data object for building before db is hooked up
let polls = [
  {id: 1, title: 'Who should be president?'},
  {id: 2, title: 'What\'s your favourite colour?'},
  {id: 3, title: 'does React make your head want to explode?'},
  {id: 4, title: 'In the land of the blind the one eyed man is king'},
  {id: 5, title: 'That\s a bit too philosophical at this late hour'},
];

// building componenets without using javascript classes
// using https://gist.github.com/jquense/47bbd2613e0b03d7e51c
// see eric elliott and mattias p johansson
// this approach use plain old objects - plainoldobjects.jsx
// https://gist.github.com/jquense/47bbd2613e0b03d7e51c#file-1-plainoldobjects-jsx
// works beautifully, makes sense, where's the gotcha....? o.O
function PollListScreen(props, context) {
  var instance = Object.create(React.Component.prototype);

  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <div className="poll-list">
        <PollDescription />
        <PollList data={instance.props.data} />
      </div>
    );
  };

  return instance;
}

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

ReactDOM.render(
  <div>
    <header>The Header</header>
    <main>
      <PollListScreen data={polls} />
    </main>
    <footer>The Footer</footer>
  </div>,
  document.getElementById('app')
);
