import React, { Component, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

const LoginButton = styled(Button)`
  display: block;
  margin: 8px auto 0px auto;
  background-color: ${(props) => props.theme.splash};
  border-color: transparent;
  color: ${(props) => props.theme.secondaryColor};
  width: stretch;
  &:hover {
    border-color: transparent;
  }
`;

const RedirectRegisterButton = styled(Button)`
  display: block;
  margin: auto;
  background-color: ${(props) => props.theme.splash};
  border-color: transparent;
  color: ${(props) => props.theme.secondaryColor};
  width: stretch;
`;

const Title = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  margin: 0;
`;

const Logo = styled(Image)`
  height: 160px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      login_errors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //important!
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    //important!
    const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3000/sessions",
        {
          user: {
            email: email,
            password: password,
          },
        },
        {
          withCredentials: true, //important!
        }
      )
      .then((response) => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <Fragment>
        <Logo src="folder.png" rounded />
        <Title>Login</Title>
        <Form onSubmit={this.handleSubmit} className="form-group">
          <Form.Group controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <LoginButton className="btn btn-primary" type="submit">
            Login
          </LoginButton>
        </Form>
        <RedirectRegisterButton onClick={() => this.props.handleRegister()}>
          Create an account
        </RedirectRegisterButton>
      </Fragment>
    );
  }
}

export default Login;
