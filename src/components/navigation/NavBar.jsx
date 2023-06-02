import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './NavBar.css';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand='lg' className='navbar'>
      <Container>
        <NavLink className='navbar-link navbar-home' to='/'>
          Home
        </NavLink>
        <div className='navbar-element'>
          <NavLink className='navbar-link' to='login'>
            Sign up
          </NavLink>
          <NavLink className='navbar-link' to='competition'>
            Competition
          </NavLink>
          <NavLink className='navbar-link' to='add_events'>
            Adauga competitie
          </NavLink>
          <NavLink className='navbar-link' to='add_participant'>
            Adauga participant
          </NavLink>
          <NavLink className='navbar-link' to='participant_view'>
            Participanti
          </NavLink>
        </div>
      </Container>
    </Navbar>
  );
}
