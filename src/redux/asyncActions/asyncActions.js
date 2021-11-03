import ApiService from "../../apiService/ApiService";
import { setPostsData, setArticle } from "../actions/actions";

const newApiService = new ApiService();

export const getPostsData = () => (dispatch) => {
  newApiService.getPostsData().then((res) => {
    dispatch(setPostsData(res.articles));
  });
};

export const getWholeArticle = (value) => (dispatch) => {
  newApiService.getArticle(value).then((res) => {
    dispatch(setArticle(res.article));
  });
};
