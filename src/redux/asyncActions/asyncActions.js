import ApiService from "../../apiService/ApiService";
import { setPostsData, setArticle, setTotalArticles, setLoading } from "../actions/actions";

const newApiService = new ApiService();

export const getPostsData = (token = 0, page = 1) => (dispatch) => {
  newApiService.getPostsData(token, page).then((res) => {
    dispatch(setPostsData(res.articles));
    dispatch(setTotalArticles(res.articlesCount));
    dispatch(setLoading(true));
  });
};

// export const getWholeArticle = (value) => (dispatch) => {
//   newApiService.getArticle(value).then((res) => {
//     dispatch(setArticle(res.article));
//     dispatch(loggedIn(true));
//   });
// };

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
