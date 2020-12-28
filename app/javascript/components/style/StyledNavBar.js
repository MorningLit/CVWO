import React from "react";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsPersonFill, BsFolderFill, BsFillDisplayFill } from "react-icons/bs";

const NaviBar = styled(Nav)`
  display: flex;
  flex-basis: 10%;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => props.theme.primaryColor};
  height: 100vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

function StyledNavBar() {
  return (
    <NaviBar className="flex-column">
      <Nav.Link as={Link} to="/todo">
        <BsFolderFill size="40px" color="#fbd129" />
      </Nav.Link>

      <Nav.Link as={Link} to="/profile">
        <BsPersonFill size="40px" color="#fbd129" />
      </Nav.Link>
    </NaviBar>
  );
}

export default React.memo(StyledNavBar);
