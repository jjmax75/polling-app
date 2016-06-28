import React from 'react';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function Navigation(props, context) {
  var instance = Object.create(React.Component.prototype);
  instance.props = props;
  instance.context = context;

  instance.render = () => {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLinkContainer to='/polls'>
              <span>Box It Off Polling App</span>
            </IndexLinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <IndexLinkContainer to='/polls' activeClassName='active'>
              <NavItem>Polls</NavItem>
            </IndexLinkContainer>
            <LinkContainer to='/logout' activeClassName='active'>
              <NavItem>Logout</NavItem>
            </LinkContainer>
            <LinkContainer to='/login' activeClassname='active'>
              <NavItem>Login</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  return instance;
}

module.exports = Navigation;
