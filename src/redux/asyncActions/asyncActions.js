import ApiService from "../../apiService/ApiService";
import { setPostsData, setArticle, setTotalArticles, setLoading } from "../actions/actions";

const newApiService = new ApiService();

export const getPostsData = (page = 1) => (dispatch) => {
  newApiService.getPostsData(page).then((res) => {
    dispatch(setPostsData(res.articles));
    dispatch(setTotalArticles(res.articlesCount));
    dispatch(setLoading(true));
  });
};

export const addLike = (slug) => (dispatch) => {
  newApiService.favoriteArticle(slug).then((res) => {
    dispatch(setArticle(res.article))
  })
}

export const deleteLike = (slug) => (dispatch) => {
  newApiService.unFavoriteArticle(slug).then((res) => {
    dispatch(setArticle(res.article))
  })
}
