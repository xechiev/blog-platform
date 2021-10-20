import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import classes from "./Header.module.scss";

export default function Header() {
  return (
    <div className={classes.wrapper}>
      <NavLink to="/">
        <h6 className={classes.blogName}>Realworld Blog</h6>
      </NavLink>
      <div className={classes.enter}>
        <NavLink to="/signIn">
          <button
            type="button"
            className={classNames(classes.signIn, classes.enterButton)}
          >
            Sign In
          </button>
        </NavLink>
        <NavLink to="/newAccount">
          <button
            type="button"
            className={classNames(classes.signUp, classes.enterButton)}
          >
            Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
}
