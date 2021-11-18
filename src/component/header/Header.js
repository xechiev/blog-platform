import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { loggedIn, toggleArticleComponent } from "../../redux/actions/actions";
import rectangle from "../../img/rectangle.svg";

import classes from "./Header.module.scss";

export default function Header() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const { isLoggedIn } = state;
  let userHeaderInfo = "";

  if (isLoggedIn) {
    const dataUser = localStorage.getItem("user");
    userHeaderInfo = JSON.parse(dataUser);
  }

  const logoutUser = () => {
    dispatch(loggedIn(false));
    localStorage.removeItem("user");
  };

  const switchCreat = () => {
    dispatch(toggleArticleComponent(false));
  };

  return (
    <div className={classes.wrapper}>
      <NavLink to="/">
        <h6 className={classes.blogName}>Realworld Blog</h6>
      </NavLink>
      {isLoggedIn ? (
        <div className={classes.profile}>
          <NavLink to="/new-article">
            <button
              type="button"
              className={classes.create}
              onClick={switchCreat}
            >
              Create article
            </button>
          </NavLink>
          <NavLink to="/profile">
            <h6 className={classes.name}>
              {userHeaderInfo ? userHeaderInfo.username : " "}
            </h6>
          </NavLink>
          <NavLink to="/profile">
            <img
              src={userHeaderInfo ? userHeaderInfo.image : rectangle}
              alt="foto"
              className={classes.avatar}
            />
          </NavLink>
          <NavLink to="/articles/">
            <button
              type="button"
              className={classNames(classes.logOut, classes.enterButton)}
              onClick={logoutUser}
            >
              Log Out
            </button>
          </NavLink>
        </div>
      ) : (
        <div className={classes.enter}>
          <NavLink to="/sign-in">
            <button
              type="button"
              className={classNames(classes.signIn, classes.enterButton)}
            >
              Sign In
            </button>
          </NavLink>
          <NavLink to="/sign-up">
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
