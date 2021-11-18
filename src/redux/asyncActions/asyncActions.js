import ApiService from "../../apiService/ApiService";
import { setPostsData, setArticle, setTotalArticles, setLike, setDisLike } from "../actions/actions";

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

export const addLike = (slug, token) => (dispatch) => {
  newApiService.favoriteArticle(slug, token).then((res) => {
    dispatch(setLike(res.article))
  })
}

export const deleteLike = (slug, token) => (dispatch) => {
  newApiService.favoriteArticle(slug, token).then((res) => {
    dispatch(setDisLike(res.article))
  })
}
