import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import {
  toggleArticleComponent,
  setArticle,
  setPostsData,
} from "../../redux/actions/actions";
import Post from "../post/Post";
import ApiService from "../../apiService/ApiService";
import Page404 from "../page404/Page404";
import "antd/dist/antd.css";

import classes from "./Article.module.scss";

export default function Article() {
  const { article, isLoaded } = useSelector((store) => store);
  const [forward, setForward] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [showButton, setShowButton] = useState(null);

  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;

  const newApi = new ApiService();

  const text = "Are you sure to delete this article?";

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    const info = JSON.parse(userInfo);

    newApi.getArticle(slug).then((res) => {
      if (Object.keys(res.article).length === 0) {
        setRedirect(true);
      } else {
        dispatch(setArticle(res.article));
        if (localStorage.getItem("user")) {
          if (res.article.author.username === info.username) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
      {redirect ? (
        <Page404 />
      ) : (
        <div className={classes.body}>
          <div className={classes.wrapper}>
            {isLoaded ? (
              <>
                <Post {...article} />
                <div className={classes.markdown}>
                  <ReactMarkdown className={classes.body}>
                    {article.body}
                  </ReactMarkdown>
                </div>
                {showButton && (
                  <div className={classes.editDelete}>
                    <Popconfirm
                      placement="rightTop"
                      title={text}
                      onConfirm={deleteArticle}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button type="button" className={classes.delete}>
                        Delete
                      </button>
                    </Popconfirm>
                    <Link to={`/articles/${slug}/edit`}>
                      <button
                        type="button"
                        className={classes.edit}
                        onClick={switchEdit}
                      >
                        Edit
                      </button>
                    </Link>
                    {forward && <Redirect to="/articles" />}
                  </div>
                )}
              </>
            ) : (
              <Spinner
                animation="border"
                variant="primary"
                className={classes.spin}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
