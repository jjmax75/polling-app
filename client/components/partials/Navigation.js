import React from 'react';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function Navigation(props, context) {
  let instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  const showLock = function showLock() {
    instance.props.lock.show();
  };

  const logout = function logout() {
    localStorage.removeItem('id_token');
  };

  instance.render = () => {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLinkContainer to='/'>
              <a href="">Box It Off Polling App</a>
            </IndexLinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <IndexLinkContainer to='/' activeClassName='active'>
              <NavItem>Home</NavItem>
            </IndexLinkContainer>
            <NavItem onClick={logout}>Logout</NavItem>
            <NavItem onClick={showLock}>Login</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  return instance;
}

export default Navigation;
