import React, { Component } from "react";
import axios from "axios";
import StyledNavBar from "./style/StyledNavBar";
import styled from "styled-components";
import StyledButton from "./style/StyledButton";

const BackgroundDiv = styled.div`
  display: flex;
  margin: 0;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;
`;

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete("/logout", { withCredentials: true })
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
        <ProfileDiv>
          <h1>Profile</h1>
          <h1>Hello {this.props.user.name}!</h1>
          <h1>Status: {this.props.loggedInStatus}</h1>
          <StyledButton
            className="btn btn-primary"
            onClick={() => this.handleLogoutClick()}
          >
            Logout
          </StyledButton>
        </ProfileDiv>
      </BackgroundDiv>
    );
  }
}

export default Profile;
