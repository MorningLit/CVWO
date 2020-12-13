import React, { Component } from "react";
import axios from "axios";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <h1>Hello {this.props.user.name}!</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button
          className="btn btn-primary"
          onClick={() => this.handleLogoutClick()}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default Dashboard;
