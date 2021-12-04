import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loggedIn } from "../../redux/actions/actions";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const [indicator, setIndicator] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedIn(true));
      setIndicator(true)
    } else {
      setIndicator(false)
    }
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) => (
        indicator ? <Component {...props} /> : <Redirect to="/sign-in" />
      )}
    />
  ) 
};

export default PrivateRoute;
