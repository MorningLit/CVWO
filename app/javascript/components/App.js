import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import ToDoPage from "./todo/ToDoPage";
import Profile from "./Profile";
import styled, { ThemeProvider } from "styled-components";
import FolderColors from "./theme/FolderColors.js";

const Background = styled.div`
  background-color: ${(props) => props.theme.primaryColor};
  font-family: "Bahnschrift SemiBold";
`;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      loading: true,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("/logged_in", { withCredentials: true })
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
        this.setState({
          loading: false,
        });
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
      <ThemeProvider theme={FolderColors}>
        <Background>
          <Switch>
            <Route
              exact
              path={"/"}
              handleLogin={this.handleLogin}
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
              loading={this.state.loading}
              component={(props) => <Dashboard {...props} {...this.state} />}
            />
            <ProtectedRoute
              exact
              path={"/todo"}
              loggedInStatus={this.state.loggedInStatus}
              loading={this.state.loading}
              component={(props) => <ToDoPage {...props} {...this.state} />}
            />
            <ProtectedRoute
              exact
              path={"/profile"}
              loggedInStatus={this.state.loggedInStatus}
              loading={this.state.loading}
              component={(props) => (
                <Profile
                  {...props}
                  handleLogout={this.handleLogout}
                  {...this.state}
                />
              )}
            />
          </Switch>
        </Background>
      </ThemeProvider>
    );
  }
}

export default App;
