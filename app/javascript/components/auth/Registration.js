import React, { Component, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegisterButton = styled(Button)`
  display: block;
  width: stretch;
  margin: 8px auto 0px auto;
  border-color: transparent;
  background-color: ${(props) => props.theme.splash};
  color: ${(props) => props.theme.secondaryColor};
`;

const RedirectLoginButton = styled(Button)`
  display: block;
  width: stretch;
  margin: auto;
  border-color: transparent;
  background-color: ${(props) => props.theme.splash};
  color: ${(props) => props.theme.secondaryColor};
`;

const Title = styled.h3`
  text-align: center;
`;

export class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      registration_errors: "",
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
    const { name, email, password, password_confirmation } = this.state;

    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
          },
        },
        {
          withCredentials: true, //important!
        }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <Fragment>
        <Title>Registration</Title>
        <Form onSubmit={this.handleSubmit} className="form-group">
          <Form.Group controlId="registrationEmail">
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
          <Form.Group controlId="registrationPassword">
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

          <Form.Group controlId="registrationConfirmPassword">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password_confirmation"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="registrationName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <RegisterButton type="submit">Register</RegisterButton>
        </Form>
        <RedirectLoginButton onClick={() => this.props.handleRegister()}>
          I already have an account
        </RedirectLoginButton>
      </Fragment>
    );
  }
}

export default Registration;
