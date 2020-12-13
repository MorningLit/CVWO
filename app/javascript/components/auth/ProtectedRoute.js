import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "../Home";

export default function ProtectedRoute({
  loggedInStatus: loggedInStatus,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedInStatus === "NOT_LOGGED_IN") {
          return <Home {...rest} loggedInStatus={loggedInStatus} />;
        } else if (loggedInStatus === "LOGGED_IN") {
          return <Component />;
        } else {
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
        }
      }}
    />
  );
}
