import React from "react";
import { Link } from "react-router-dom";
import Form from "../form/Form";
import Button from "../button/Button";

import classes from "./SignIn.module.scss";

export default function SignIn() {
  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <h5 className={classes.title}>Sign In</h5>
        <div>{Form("Email address", "email", "Email address")}</div>
        <div>{Form("Password", "password", "Password")}</div>
        <div className={classes.button}>{Button("Login")}</div>
        <span className={classes.haveAccount}>
          Don’t have an account?
          {" "}
          <Link to="/" className={classes.signIn}>
            Sign In.
          </Link>
        </span>
      </div>
    </div>
  );
}
