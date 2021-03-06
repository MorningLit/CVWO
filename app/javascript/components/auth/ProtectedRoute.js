import React from "react";
import { Route, Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export default function ProtectedRoute({
  loggedInStatus: loggedInStatus,
  component: Component,
  loading: loading,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <Spinner animation="border" />;
        } else if (loggedInStatus === "LOGGED_IN") {
          return <Component {...rest} />;
        } else if (loggedInStatus === "NOT_LOGGED_IN") {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}
