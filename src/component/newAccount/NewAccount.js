import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Redirect } from "react-router-dom";
import classNames from "classnames";
import { Alert } from "react-bootstrap";
import ApiService from "../../apiService/ApiService";

import classes from "./NewAccount.module.scss";
import { loggedIn } from "../../redux/actions/actions";

const SignupSchema = yup.object().shape({
  username: yup.string().required().min(3).max(20),
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(40),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match"),
  checkbox: yup.boolean().required().oneOf([true], "field must be checked"),
});

export default function NewAccount() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store);

  const [forward, setForward] = useState(null);
  const [errorSignIn, setErrorSignIn] = useState(null);

  const newApi = new ApiService();

  const onSubmit = (data) => {
    const array = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    newApi.registerUser(array).then((res) => {
      setErrorSignIn(false);
      if (res === "error") {
        setErrorSignIn(true);
      } else {
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch(loggedIn(true));
        setForward(false);
        setTimeout(() => {
          setForward(true);
        }, 1500);
      }
    });
  };

  return (
    <div className={classes.body}>
      {isLoggedIn ? (
        <>
          <Alert variant="primary" className={classes.alert}>
            Registration was successful!
          </Alert>
          {forward && <Redirect to="/articles" />}
        </>
      ) : (
        <div className={classes.wrapper}>
          {errorSignIn && (
            <Alert variant="danger" className={classes.alert422}>
              Username or email has already been taken!
            </Alert>
          )}
          <h5 className={classes.name}>Create new account</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h6 className={classes.title}>Username</h6>
            <input
              {...register("username")}
              className={classes.form}
              placeholder="some-username"
            />
            {errors.username && (
              <p className={classes.error}>{errors.username.message}</p>
            )}
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
            <h6 className={classes.title}>Repeat Password</h6>
            <input
              {...register("passwordConfirmation")}
              className={classes.form}
              type="password"
            />
            {errors.passwordConfirmation && (
              <p className={classes.error}>
                {errors.passwordConfirmation.message}
              </p>
            )}
            <div className={classes.line} />
            <label className={classNames(classes.check, classes.option)}>
              <input
                {...register("checkbox")}
                type="checkbox"
                className={classNames(classes.processing, classes.option)}
              />
              <span className={classes.checkBox} />
              <span className={classes.value}>
                I agree to the processing of my personal information
              </span>
            </label>
            {errors.checkbox && (
              <p className={classes.error}>{errors.checkbox.message}</p>
            )}
            <button type="submit" className={classes.submit}>
              Create
            </button>
            <span className={classes.haveAccount}>
              Already have an account?
              <Link to="/signIn" className={classes.signIn}>
                Sign In.
              </Link>
            </span>
          </form>
        </div>
      )}
    </div>
  );
}
