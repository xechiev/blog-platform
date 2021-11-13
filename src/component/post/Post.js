/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { IoIosHeartEmpty } from "react-icons/io";
import heart from "../../img/Vector.svg";
import rectangle from "../../img/rectangle.svg";
import Vector from "../../img/Vector.svg";
import ApiService from "../../apiService/ApiService";

import classes from "./Post.module.scss";

const newApi = new ApiService();

export default function Post({
  title,
  tagList,
  author,
  description,
  updatedAt,
  favoritesCount,
  favorited,
}) {
  const params = useParams();
  const history = useHistory();
  const { slug } = params;

  const handleClick = () => {
    const userInfo = localStorage.getItem("user");
    const info = JSON.parse(userInfo);
    const { token } = info;
    if (favorited) {
      newApi.unFavoriteArticle(slug, token);
      history.go(0);
    } else {
      newApi.favoriteArticle(slug, token);
      history.go(0);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <div className={classes.titleLike}>
          <h5 className={classes.title}>{title}</h5>
          <img
            src={heart}
            alt="heart"
            onClick={handleClick}
            className={classes.heart}
          />
          <span className={classes.likes}>{favoritesCount}</span>
        </div>
        {tagList.map((tag) => (
          <div className={classes.tag} key={Math.random()}>
            {tag}
          </div>
        ))}
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.info}>
        <div className={classes.nameData}>
          <h6 className={classes.name}>{author.username}</h6>
          <p className={classes.data}>{format(new Date(updatedAt), "PP")}</p>
        </div>
        <img src={author.image} alt="avatar" className={classes.avatar} />
      </div>
    </div>
  );
}

Post.defaultValue = {
  favoritesCount: 0,
  favorited: false,
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  author: PropTypes.objectOf(PropTypes.string).isRequired,
  updatedAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  favorited: PropTypes.bool.isRequired,
};
