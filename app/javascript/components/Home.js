import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import styled from "styled-components";

const BackgroundDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginDiv = styled.div`
  padding: 24px;
  background-color: #ccccff;
  border-radius: 30px;
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
        <LoginDiv className="col col-md-4 border border-primary">
          <h4>Status: {this.props.loggedInStatus}</h4>

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
