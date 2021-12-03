import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector((store) => store);

  return (
    <Route
      {...rest}
      render={(props) => (
        isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      )}
    />
  );
};

export default PrivateRoute;
