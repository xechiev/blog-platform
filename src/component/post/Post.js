import React, { useState } from "react";
import { useParams } from "react-router";
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
  const { slug } = params;

  const handleClick = () => {
    const userInfo = localStorage.getItem("user");
    const token = JSON.parse(userInfo);
    if (favorited) {
      newApi.unFavoriteArticle(slug, token.token);
    } else {
      newApi.favoriteArticle(slug, token.token);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <div className={classes.titleLike}>
          <h5 className={classes.title}>{title}</h5>
          <heart className={classes.heart} onClick={handleClick} />
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
