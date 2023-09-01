import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import "./NavBar.css";
import { useAuth } from "../../context/AuthProvider";

export default function NavBar() {
  const { auth, setAuth } = useAuth();

  console.log(auth);

  const tooltip = (
    <Tooltip id="tooltip">
      <strong>Click here to LogOut</strong>
    </Tooltip>
  );

  const handelelogoutUser = () => {
    const user = localStorage.removeItem("user");
    setAuth();
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <NavLink className="navbar-link navbar-home" to="/">
          Home
        </NavLink>
        <div className="navbar-element">
          <NavLink className="navbar-link" to="competition">
            Competition
          </NavLink>
          <NavLink className="navbar-link" to="add_events">
            Adauga competitie
          </NavLink>
          {auth ? (
            <div className="active-user">
              <img src="images/authentication.png" alt="user" />
              <p style={{ cursor: "pointer" }}>{auth.username}</p>
              <OverlayTrigger placement="bottom" overlay={tooltip}>
                <Button onClick={handelelogoutUser}>
                  <img src="images/logout.png" alt="logout" />
                </Button>
              </OverlayTrigger>
            </div>
          ) : (
            <NavLink className="navbar-link" to="signup">
              Sign up
            </NavLink>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
