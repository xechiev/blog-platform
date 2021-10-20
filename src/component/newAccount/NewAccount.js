import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Form from "../form/Form";
import Button from "../button/Button";

import classes from "./NewAccount.module.scss";

export default function NewAccount() {
  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <h5 className={classes.title}>Create new account</h5>
        {Form("Username", "text", "Username")}
        {Form("Email address", "email", "Email address")}
        {Form("Password", "password", "Password")}
        {Form("Repeat Password", "password", "Password")}
        <div className={classes.line} />
        <label className={classNames(classes.check, classes.option)}>
          <input
            type="checkbox"
            className={classNames(classes.processing, classes.option)}
          />
          <span className={classes.checkBox} />
          <span className={classes.value}>
            I agree to the processing of my personal information
          </span>
        </label>
        <div className={classes.button}>{Button("Create")}</div>
        <span className={classes.haveAccount}>
          Already have an account?
          {" "}
          <Link to="/" className={classes.signIn}>
            Sign In.
          </Link>
        </span>
      </div>
    </div>
  );
}
