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
  width: 90vw;
  height: 100vh;
`;

const HeaderDiv = styled.div`
  display: flex;
  height: 10vh;
  width: stretch;
  justify-content: space-between;
  padding: 8px 16px 0 16px;
`;

const LogoutButton = styled(StyledButton)`
  width: initial;
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
          <HeaderDiv>
            <h1>Hello {this.props.user.name}!</h1>
            <LogoutButton onClick={() => this.handleLogoutClick()}>
              Logout
            </LogoutButton>
          </HeaderDiv>
        </ProfileDiv>
      </BackgroundDiv>
    );
  }
}

export default Profile;
