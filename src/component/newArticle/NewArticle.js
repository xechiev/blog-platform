import React from "react";
import Form from "../form/Form";
import classes from "./NewArticle.module.scss";


export default function NewArticle() {
  return (
    <div className={classes.wrapper}>
      <h5 className={classes.name}>Create new article</h5>
      <input type="text" className={classes.title} placeholder="Title" />
      <input type="text" className={classes.title} placeholder="Title" />

    </div>
  )
}