import React, { Component } from "react";
import axios from "axios";
import StyledNavBar from "./style/StyledNavBar";
import styled from "styled-components";

const BackgroundDiv = styled.div`
  display: flex;
  margin: 0;
`;

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <BackgroundDiv>
        <StyledNavBar />
        <button
          className="btn btn-primary"
          onClick={() => this.handleLogoutClick()}
        >
          Logout
        </button>
      </BackgroundDiv>
    );
  }
}

export default Profile;
