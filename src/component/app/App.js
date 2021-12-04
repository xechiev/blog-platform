import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Page404 from "../page404/Page404";
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
        <Switch>
          <Route
            path={["/", "/articles"]}
            exact
            component={PostList}
          />
          <Route path="/articles/:slug" exact component={Article} />
          <PrivateRoute
            path="/articles/:slug/edit"
            exact
            component={EditArticle}
          />
          <Route path="/sign-up" exact component={NewAccount} />
          <Route path="/sign-in" exact component={SignIn} />
          <PrivateRoute path="/profile" exact component={EditProfile} />
          <PrivateRoute path="/new-article" exact component={NewArticle} />
          <Route component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}
