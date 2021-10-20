import React from "react";
import classes from "./Button.module.scss";

export default function Button(title) {
  return (
    <button type="submit" className={classes.submit}>
      {title}
    </button>
  );
}
