import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";
import { Alert } from "react-bootstrap";
import Post from "../post/Post";
import Button from "../button/Button";

import classes from "./Article.module.scss";

export default function Article({ slugItem }) {
  const state = useSelector((store) => store);
  const { dataPosts } = state;

  const pos = dataPosts.find((item) => item.slug === slugItem);

  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <Post {...pos} />
        <div className={classes.markdown}>
          <ReactMarkdown className={classes.body}>{pos.body}</ReactMarkdown>
        </div>
        <div className={classes.editDelete}>
          {Button("Delete", "F5222D", 31)}
          {Button("Edit", "52C41A", 31)}
        </div>
      </div>
    </div>
  );
}

Article.propTypes = {
  slugItem: PropTypes.string.isRequired,
};
