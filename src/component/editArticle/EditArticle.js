import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { toggleArticleComponent } from "../../redux/actions/actions";
import { getWholeArticle } from "../../redux/asyncActions/asyncActions";

import NewArticle from "../newArticle/NewArticle";

import classes from "./EditArticle.module.scss";

export default function EditArticle() {
  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    dispatch(getWholeArticle(slug));
    dispatch(toggleArticleComponent(true));
  }, []);
  return (
    <>
      <NewArticle />
    </>
  );
}
