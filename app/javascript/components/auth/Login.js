import React, { Component, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import StyledButton from "../style/StyledButton";

const Logo = styled(Image)`
  height: 160px;
  margin: auto;
`;
const Title = styled.h3`
  text-align: center;
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
        "/sessions",
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

          <StyledButton type="submit">Login</StyledButton>
        </Form>
        <StyledButton onClick={() => this.props.handleRegister()}>
          Create an account
        </StyledButton>
      </Fragment>
    );
  }
}

export default Login;
