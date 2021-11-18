import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../header/Header";
import PostList from "../postList/PostList";
import Article from "../article/Article";
import NewAccount from "../newAccount/NewAccount";
import SignIn from "../signIn/SignIn";
import EditProfile from "../editProfile/EditProfile";
import NewArticle from "../newArticle/NewArticle";
import EditArticle from "../editArticle/EditArticle";

import classes from "./App.module.scss";

export default function App() {
  return (
    <Router>
      <Header />
      <div className={classes.app}>
        <Route path={["/", "/articles"]} exact render={() => <PostList />} />
        <Route path="/articles/:slug" exact render={() => <Article />} />
        <Route
          path="/articles/:slug/edit"
          exact
          render={() => <EditArticle />}
        />
        <Route path="/sign-up" exact component={NewAccount} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/profile" exact component={EditProfile} />
        <Route path="/new-article" exact component={NewArticle} />
      </div>
    </Router>
  );
}
