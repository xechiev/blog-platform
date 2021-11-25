import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router";
import ReactMarkdown from "react-markdown";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { getWholeArticle } from "../../redux/asyncActions/asyncActions";
import {
  toggleArticleComponent,
  setLoading,
  setNullArticle,
  setPostsData,
} from "../../redux/actions/actions";
import Post from "../post/Post";

import ApiService from "../../apiService/ApiService";
import Button from "../button/Button";
import "antd/dist/antd.css";

import classes from "./Article.module.scss";

export default function Article() {
  const state = useSelector((store) => store);
  const { article, isLoggedIn, isLoaded } = state;
  const [forward, setForward] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;

  const newApi = new ApiService();

  const text = "Are you sure to delete this article?";

  useEffect(() => {
    dispatch(getWholeArticle(slug));
  }, [dispatch, slug]);

  const switchEdit = () => {
    dispatch(toggleArticleComponent(true));
  };

  const confirm = () => {
    message.info("Article deleted!");
  };

  const deleteArticle = () => {
    newApi.deleteArticle(slug).then((res) => {
      if (res === "ok") {
        confirm();
        dispatch(setPostsData([]));
        setForward(true);
      }
    });
  };
  // if (article.author.username !== info.username) {
  //   dispatch(loggedIn(false));
  // }
  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        {isLoaded ? (
          <Post {...article} />
        ) : (
          <Spinner
            animation="border"
            variant="primary"
            className={classes.spin}
          />
        )}
        <div className={classes.markdown}>
          <ReactMarkdown className={classes.body}>{article.body}</ReactMarkdown>
        </div>
        {isLoggedIn && (
          <div className={classes.editDelete}>
            <Popconfirm
              placement="rightTop"
              title={text}
              onConfirm={deleteArticle}
              okText="Yes"
              cancelText="No"
            >
              {Button("Delete", "F5222D", 31)}
            </Popconfirm>
            <Link to={`/articles/${slug}/edit`}>
              {Button("Edit", "52C41A", 31, switchEdit)}
            </Link>
            {forward && <Redirect to="/articles" />}
          </div>
        )}
      </div>
    </div>
  );
}
