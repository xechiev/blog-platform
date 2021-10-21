import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsData } from "../../redux/asyncActions/asyncActions";
import Header from "../header/Header";
import PostList from "../postList/PostList";
import Article from "../article/Article";
import Pagin from "../pagin/Pagin";
import NewAccount from "../newAccount/NewAccount";
import SignIn from "../signIn/SignIn";
import EditProfile from "../editProfile/EditProfile";

import classes from "./App.module.scss";

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const { dataPosts, totalCount, currentPage } = state;

  useEffect(() => {
    dispatch(getPostsData());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <div className={classes.app}>
        <Route path="/" exact render={() => <PostList />} />
        <Route path="/articles/" exact render={() => <PostList />} />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params;
            return <Article slugItem={slug} />;
          }}
        />
        <Route path="/newAccount" exact component={NewAccount} />
        <Route path="/signIn" exact component={SignIn} />
        <Route path="/editProfile" exact component={EditProfile} />
        {/* {totalCount > 5 ? Pagin(totalCount, 1, currentPage) : " "} */}
      </div>
    </Router>
  );
}
