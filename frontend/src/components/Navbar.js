import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Bar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Link to="/" className="navbar-brand">
      Excercise Tracker
    </Link>
    <Navbar.Toggle aria-controls="nav" />
    <Navbar.Collapse id="nav">
      <Nav className="mr-auto">
        <Nav.Item>
          <Link to="/" className="nav-link">
            Exercises
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/create" className="nav-link">
            Create Exercise
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/user" className="nav-link">
            Create User
          </Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Bar;
