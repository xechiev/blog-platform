import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Post from "../post/Post";
import classes from "./PostList.module.scss";

const PostList = () => {
  const state = useSelector((store) => store);
  const { dataPosts } = state;

  return (
    <div className={classes.wrapper}>
      <ul className={classes.postList}>
        {dataPosts.slice(0, 5).map((post) => (
          <li className={classes.post} key={Math.random()}>
            <Link to={`/articles/${post.slug}`}>
              <Post {...post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
