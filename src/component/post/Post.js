import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import classes from "./Post.module.scss";
import heart from "../../img/Vector.svg";
import rectangle from "../../img/rectangle.svg";

export default function Post({
  title,
  tagList,
  author,
  description,
  updatedAt,
  favoritesCount,
  image,
}) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <div className={classes.titleLike}>
          <h5 className={classes.title}>{title}</h5>
          <img src={heart} alt="heart" className={classes.heart} />
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
        <img src={rectangle} alt="avatar" className={classes.avatar} />
      </div>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  author: PropTypes.objectOf(PropTypes.string).isRequired,
  updatedAt: PropTypes.string.isRequired,
};
