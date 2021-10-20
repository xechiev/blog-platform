import React from "react";
import classes from "./Form.module.scss";

export default function Form(title, type, placehold) {
  return (
    <div className={classes.wrapper}>
      <h6 className={classes.title}>{title}</h6>
      <input type={type} className={classes.form} placeholder={placehold} />
    </div>
  );
}
