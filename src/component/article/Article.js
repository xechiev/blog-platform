import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getWholeArticle } from "../../redux/asyncActions/asyncActions";
import { toggleArticleComponent } from "../../redux/actions/actions";
import Post from "../post/Post";
import Button from "../button/Button";

import classes from "./Article.module.scss";

export default function Article() {
  const state = useSelector((store) => store);
  const { article, isLoaded, isLoggedIn } = state;

  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    dispatch(getWholeArticle(slug));
  }, [slug, dispatch]);

  const switchEdit = () => {
    dispatch(toggleArticleComponent(true));
  };

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
            {Button("Delete", "F5222D", 31)}
            <Link to={`/articles/${slug}/edit`}>
              {Button("Edit", "52C41A", 31, switchEdit)}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
