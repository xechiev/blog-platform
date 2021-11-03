import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsData } from "../../redux/asyncActions/asyncActions";
import Header from "../header/Header";
import PostList from "../postList/PostList";
import Article from "../article/Article";
import NewAccount from "../newAccount/NewAccount";
import SignIn from "../signIn/SignIn";
import EditProfile from "../editProfile/EditProfile";
import NewArticle from "../newArticle/NewArticle";

import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.scss";
import { loggedIn } from "../../redux/actions/actions";
import EditArticle from "../editArticle/EditArticle";

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const { isLoggedIn, dataPosts } = state;

  useEffect(() => {
    dispatch(getPostsData());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedIn(true));
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <div className={classes.app}>
        <Route path="/" exact render={() => <PostList />} />
        <Route path="/articles/" exact render={() => <PostList />} />
        <Route path="/articles/:slug" exact render={() => <Article />} />
        <Route
          path="/articles/:slug/edit"
          exact
          render={() => <EditArticle />}
        />
        <Route path="/newAccount" exact component={NewAccount} />
        <Route path="/signIn" exact component={SignIn} />
        <Route path="/editProfile" exact component={EditProfile} />
        <Route path="/new-article" exact component={NewArticle} />
        {/* {totalCount > 5 ? Pagin(totalCount, 1, currentPage) : " "} */}
      </div>
    </Router>
  );
}
