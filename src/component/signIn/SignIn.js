import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
import ApiService from "../../apiService/ApiService";
import { loggedIn, isErrorSignIn } from "../../redux/actions/actions";

import classes from "./SignIn.module.scss";

const SignupSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(40),
});

export default function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const { showErrorSignIn, redirect } = state;

  const newApi = new ApiService();

  const onSubmit = (data) => {
    newApi.authenticationUser(data).then((res) => {
      dispatch(isErrorSignIn(false));
      if (res.errors) {
        dispatch(isErrorSignIn(true));
      } else {
        dispatch(loggedIn(true));
        dispatch(isErrorSignIn(false));
      }
    });
  };
  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        {showErrorSignIn && (
          <Alert variant="danger" className={classes.danger}>
            Invalid email or password!
          </Alert>
        )}
        {redirect ? <Redirect to="/articles/" /> : " "}
        <h5 className={classes.name}>Sign In</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className={classes.title}>Email address</h6>
          <input
            {...register("email")}
            className={classes.form}
            type="email"
            placeholder="alex@example.com"
          />
          {errors.email && (
            <p className={classes.error}>{errors.email.message}</p>
          )}
          <h6 className={classes.title}>Password</h6>
          <input
            {...register("password")}
            className={classes.form}
            type="password"
          />
          {errors.password && (
            <p className={classes.error}>{errors.password.message}</p>
          )}
          <button type="submit" className={classes.submit}>
            Login
          </button>
          <span className={classes.haveAccount}>
            Don’t have an account?
            <Link to="/newAccount" className={classes.signIn}>
              Sign Up.
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
