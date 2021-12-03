import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  toggleArticleComponent,
  setArticle,
} from "../../redux/actions/actions";
import NewArticle from "../newArticle/NewArticle";
import ApiService from "../../apiService/ApiService";
import Page404 from "../page404/Page404";

export default function EditArticle() {
  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;
  const newApi = new ApiService();

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    newApi.getArticle(slug).then((res) => {
      if (Object.keys(res.article).length === 0) {
        setRedirect(true);
      }
      dispatch(setArticle(res.article));
    });
    dispatch(toggleArticleComponent(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, slug]);

  return <>{redirect ? <Page404 /> : <NewArticle />}</>;
}
