import React, { useState, useContext } from 'react';
import './Static/css/Navigation.css';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import UserContext from './Helpers/UserContext';

const Navigation = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const loggedIn = (
    <>
      <NavItem>
        <NavLink to="/companies">Companies</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/jobs">Jobs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/profile">Profile</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="logout" to="/" onClick={logout}>
          Logout
        </NavLink>
      </NavItem>
    </>
  );

  const loggedOut = (
    <>
      <NavItem>
        <NavLink to="/login">Login</NavLink>
      </NavItem>
    </>
  );
  return (
    <div className="sticky-top">
      <Navbar color="white" light expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {currentUser ? loggedIn : loggedOut}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
