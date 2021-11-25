/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { addLike, deleteLike } from "../../redux/asyncActions/asyncActions";

import classes from "./Post.module.scss";

export default function Post({
  title,
  tagList,
  author,
  description,
  updatedAt,
  favoritesCount,
  favorited,
  slug,
}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    const userInfo = localStorage.getItem("user");
    const info = JSON.parse(userInfo);
    const { token } = info;

    return favorited ? dispatch(deleteLike(slug, token)) : dispatch(addLike(slug, token));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <div className={classes.titleLike}>
          <h5 className={classes.title}>{title}</h5>
          <div className={classes.favor}>
            <button
              type="button"
              className={favorited ? classes.favorite : classes.noFavorite}
              onClick={() => handleClick()}
            />
            <p className={classes.likes}>{favoritesCount}</p>
          </div>
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
