import React from "react";
import { Link } from "react-router-dom";
import Form from "../form/Form";
import Button from "../button/Button";

import classes from "./EditProfile.module.scss";

export default function EditProfile() {
  return (
    <div className={classes.wrapper}>
      <h5 className={classes.title}>Edit Profile</h5>
      <div>{Form("Username", "text", "Username")}</div>
      <div>{Form("Email address", "email", "Email address")}</div>
      <div>{Form("New Password", "password", "New Password")}</div>
      <div>{Form("Avatar image (url)", "url", "Avatar image")}</div>
      <div className={classes.button}>{Button("Save")}</div>
    </div>
  );
}
