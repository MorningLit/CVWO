import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { createGlobalStyle } from "styled-components";
import ProtectedRoute from "./auth/ProtectedRoute";

const GlobalStyle = createGlobalStyle`
html {
  height: 100%;
}
body {
  background-image: linear-gradient(to left, #99ccff, #0099ff);
  min-height: 100vh;
  margin:0;
  overflow: hidden;
}
`;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((response) => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
          });
        } else if (
          !response.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="App">
        <GlobalStyle />
        <Switch>
          <Route
            exact
            path={"/"}
            render={(props) => (
              <Home
                {...props}
                handleLogin={this.handleLogin}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <ProtectedRoute
            exact
            path={"/dashboard"}
            loggedInStatus={this.state.loggedInStatus}
            handleLogin={this.handleLogin}
            component={(props) => (
              <Dashboard
                {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                {...this.state}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
