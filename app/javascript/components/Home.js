import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import styled from "styled-components";

const BackgroundDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const LoginDiv = styled.div`
  padding: 24px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.secondaryColor};
  border-radius: 10px;
`;

export class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {
      register: false,
    };
  }

  handleRegister() {
    this.setState({
      register: !this.state.register,
    });
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <BackgroundDiv className="row">
        <LoginDiv className="col col-md-4">
          {this.state.register ? (
            <Registration
              handleSuccessfulAuth={this.handleSuccessfulAuth}
              handleRegister={this.handleRegister}
            />
          ) : (
            <Login
              handleSuccessfulAuth={this.handleSuccessfulAuth}
              handleRegister={this.handleRegister}
            />
          )}
        </LoginDiv>
      </BackgroundDiv>
    );
  }
}

export default Home;
