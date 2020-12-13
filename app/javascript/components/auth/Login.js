import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const LoginButton = styled.button`
  display: block;
  margin: 8px auto 0px auto;
`;

const RedirectRegisterButton = styled.button`
  display: block;
  margin: auto;
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
      <div>
        <form onSubmit={this.handleSubmit} className="form-group">
          <label htmlFor="LoginInputEmail">Email address</label>
          <input
            id="LoginInputEmail"
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          ></input>
          <label htmlFor="LoginInputPassword">Password</label>

          <input
            id="LoginInputPassword"
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          ></input>

          <LoginButton className="btn btn-primary" type="submit">
            Login
          </LoginButton>
        </form>
        <RedirectRegisterButton onClick={() => this.props.handleRegister()}>
          Create an account
        </RedirectRegisterButton>
      </div>
    );
  }
}

export default Login;
