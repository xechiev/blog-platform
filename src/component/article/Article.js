import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router";
import ReactMarkdown from "react-markdown";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { getWholeArticle } from "../../redux/asyncActions/asyncActions";
import { toggleArticleComponent } from "../../redux/actions/actions";
import Post from "../post/Post";

import ApiService from "../../apiService/ApiService";
import Button from "../button/Button";
import "antd/dist/antd.css";

import classes from "./Article.module.scss";

export default function Article() {
  const state = useSelector((store) => store);
  const { article, isLoggedIn } = state;
  const [forward, setForaward] = useState(false);
  const [art, setArt] = useState([]);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;

  const newApi = new ApiService();

  const text = "Are you sure to delete this article?";

  useEffect(() => {
    newApi.getArticle(slug).then((res) => {
      setArt(res.article);
      setLoad(true);
    });
    // dispatch(getWholeArticle(slug)).then((res) => {
    //   console.log(res);
    // });
  }, []);

  const switchEdit = () => {
    dispatch(toggleArticleComponent(true));
  };

  const confirm = () => {
    message.info("Article deleted!");
    setForaward(true);
  };

  const deleteArticle = () => {
    const userInfo = localStorage.getItem("user");
    const token = JSON.parse(userInfo);

    newApi.deleteArticle(slug, token.token);
    confirm();
  };

  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        {forward && <Redirect to="/articles" />}
        {load ? (
          <Post {...art} />
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
          </div>
        )}
      </div>
    </div>
  );
}
