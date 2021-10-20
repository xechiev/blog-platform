import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { getWholeArticle } from "../../redux/asyncActions/asyncActions";
import Post from "../post/Post";
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
      </div>
    </div>
  );
}

Article.propTypes = {
  slugItem: PropTypes.string.isRequired,
};
