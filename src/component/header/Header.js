import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import classNames from "classnames";
import rectangle from "../../img/rectangle.svg";

import classes from "./Header.module.scss";

export default function Header() {
  const state = useSelector((store) => store);
  const { isLoggedIn } = state;

  return (
    <div className={classes.wrapper}>
      <NavLink to="/">
        <h6 className={classes.blogName}>Realworld Blog</h6>
      </NavLink>
      {isLoggedIn ? (
        <div className={classes.profile}>
          <NavLink to="/new-article">
            <button type="button" className={classes.create}>
              Create article
            </button>
          </NavLink>
          <h6 className={classes.name}>John Doe</h6>
          <NavLink to="/editProfile">
            <img src={rectangle} alt="avatar" className={classes.avatar} />
          </NavLink>
          <NavLink to="/articles/">
            <button
              type="button"
              className={classNames(classes.logOut, classes.enterButton)}
            >
              Log Out
            </button>
          </NavLink>
        </div>
      ) : (
        <div className={classes.enter}>
          <NavLink to="/signIn/">
            <button
              type="button"
              className={classNames(classes.signIn, classes.enterButton)}
            >
              Sign In
            </button>
          </NavLink>
          <NavLink to="/newAccount/">
            <button
              type="button"
              className={classNames(classes.signUp, classes.enterButton)}
            >
              Sign Up
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
