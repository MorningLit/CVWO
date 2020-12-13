import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const RegisterButton = styled.button`
  display: block;
  margin: 8px auto 0px auto;
`;

const RedirectLoginButton = styled.button`
  display: block;
  margin: auto;
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
      <div>
        <form onSubmit={this.handleSubmit} className="form-group">
          <label htmlFor="RegisterInputEmail">Email address</label>
          <input
            id="RegisterInputEmail"
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          ></input>
          <label htmlFor="RegisterInputPassword">Password</label>
          <input
            id="RegisterInputPassword"
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          ></input>
          <label htmlFor="RegisterInputConfirmPassword">
            Password Confirmation
          </label>

          <input
            id="RegisterInputConfirmPassword"
            className="form-control"
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          ></input>
          <label htmlFor="RegisterInputName">Name</label>
          <input
            id="RegisterInputName"
            className="form-control"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          ></input>
          <RegisterButton className="btn btn-primary" type="submit">
            Register
          </RegisterButton>
        </form>
        <RedirectLoginButton onClick={() => this.props.handleRegister()}>
          I already have an account
        </RedirectLoginButton>
      </div>
    );
  }
}

export default Registration;
