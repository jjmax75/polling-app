import React from 'react';
import Header from './partials/Header';
import Footer from './partials/Footer';

function App(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.componentWillMount = () => {
    instance.lock = new Auth0Lock('YsptjX6EusKFKOpnw14nUi2ePNivAZLQ', 'boxitoff.eu.auth0.com');
    instance.setState({idToken:   getIdToken()});
  };

  const createLock = function createLock() {
    instance.lock = new Auth0Lock(instance.props.clientId, instance.props.domain);
  };

  const getIdToken = function getIdToken() {
    let idToken = localStorage.getItem('id_token');
    const authHash = instance.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        console.log('Error signing in', authHash);
      }
    }
    return idToken;
  }

  instance.render = () => {
    return (
      <div className="poll-app">
        <Header lock={instance.lock} idToken={instance.state.idToken} />
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

export default App;
