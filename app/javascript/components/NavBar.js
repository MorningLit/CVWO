import React from "react";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NaviBar = styled(Nav)`
  display: flex;
  justify-content: space-evenly;
  background-color: #66ffff;
  width: 10vw;
  height: 100vh;
`;

export default function NavBar() {
  return (
    <NaviBar className="flex-column">
      <Nav.Link as={Link} to="/dashboard">
        Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/todo">
        Todo
      </Nav.Link>
      <Nav.Link as={Link} to="/profile">
        Profile
      </Nav.Link>
    </NaviBar>
  );
}
