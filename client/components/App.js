import React from 'react';
import Header from './partials/Header';
import Footer from './partials/Footer';

function App(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <div className="poll-app">
        <Header />
        <main>
          <div className="container">
            {instance.props.children}
          </div>
        </main>
        <Footer />
      </div>
    );
  };

  return instance;
}

module.exports = App;
