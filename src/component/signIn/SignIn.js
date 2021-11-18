import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
import ApiService from "../../apiService/ApiService";
import { loggedIn } from "../../redux/actions/actions";

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

  const [redirect, setRedirect] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState(false);

  const newApi = new ApiService();

  const onSubmit = (data) => {
    newApi.authenticationUser(data).then((res) => {
      setErrorSignIn(false);
      if (res.errors) {
        setErrorSignIn(true);
      } else {
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch(loggedIn(true));
        setRedirect(true);
        setErrorSignIn(false);
      }
    });
  };
  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        {errorSignIn && (
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
            {" "}
            <Link to="/sign-up" className={classes.signIn}>
              Sign Up.
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
