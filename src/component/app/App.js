import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPostsData } from "../../redux/asyncActions/asyncActions";
import Header from "../header/Header";
import PostList from "../postList/PostList";
import Article from "../article/Article";
import NewAccount from "../newAccount/NewAccount";
import SignIn from "../signIn/SignIn";
import EditProfile from "../editProfile/EditProfile";
import NewArticle from "../newArticle/NewArticle";
import Pagin from "../pagin/Pagin";
import { loggedIn } from "../../redux/actions/actions";
import EditArticle from "../editArticle/EditArticle";

import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.scss";

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((store) => store);
  const { isLoggedIn, dataPosts, totalCount, article } = state;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userInfo = localStorage.getItem("user");
      const info = JSON.parse(userInfo);
      const { token } = info;
      dispatch(getPostsData(token, currentPage));
      dispatch(loggedIn(true));
    } else {
      dispatch(getPostsData());
    }
  }, [dispatch, currentPage]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

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
        {dataPosts.length >= 5 ? Pagin(totalCount, 1, currentPage, onChange) : " "}
      </div>
    </Router>
  );
}
