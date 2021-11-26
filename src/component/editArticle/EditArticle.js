import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { toggleArticleComponent } from "../../redux/actions/actions";
import NewArticle from "../newArticle/NewArticle";
import ApiService from "../../apiService/ApiService";

export default function EditArticle() {
  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;
  const newApi = new ApiService();

  useEffect(() => {
    newApi.getArticle(slug);
    dispatch(toggleArticleComponent(true));
  }, []);

  return (
    <>
      <NewArticle />
    </>
  );
}
