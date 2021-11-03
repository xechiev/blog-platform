import React from "react";
import { useParams } from "react-router";

import NewArticle from "../newArticle/NewArticle";

import classes from "./EditArticle.module.scss";

export default function EditArticle() {
  const params = useParams();
  const { slug } = params;

  return (
    <>
      <h1>Edit article</h1>
      <NewArticle />
    </>
  );
}
