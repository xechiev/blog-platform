import ApiService from "../../apiService/ApiService";
import { setPostsData, setArticle, setTotalArticles } from "../actions/actions";

const newApiService = new ApiService();

export const getPostsData = (token = 0, page = 1) => (dispatch) => {
  newApiService.getPostsData(token, page).then((res) => {
    dispatch(setPostsData(res.articles));
    dispatch(setTotalArticles(res.articlesCount));
  });
};

export const getWholeArticle = (value) => (dispatch) => {
  newApiService.getArticle(value).then((res) => {
    dispatch(setArticle(res.article));
  });
};
