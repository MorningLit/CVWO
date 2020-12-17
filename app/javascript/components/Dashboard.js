import React, { Component } from "react";
import NavBar from "./NavBar";
import styled from "styled-components";

const BackgroundDiv = styled.div`
  display: flex;
  margin: 0;
  min-height: 100vh;
`;

export class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BackgroundDiv>
        <NavBar />
        <div>
          <h1>Dashboard</h1>
          <h1>Hello {this.props.user.name}!</h1>
          <h1>Status: {this.props.loggedInStatus}</h1>
        </div>
      </BackgroundDiv>
    );
  }
}

export default Dashboard;
