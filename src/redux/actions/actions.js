export const SET_POSTS_DATA = "SET_POSTS_DATA";
export const GET_NEXT_PAGE = "GET_NEXT_PAGE";
export const SET_ARTICLE = "GET_ARTICLE";
export const TOGGLE_POST = "TOGGLE_POST";

export const setPostsData = (posts) => ({
  type: SET_POSTS_DATA,
  payload: posts,
});

export const getNextPage = (num) => ({
  type: GET_NEXT_PAGE,
  payload: num,
});

export const setArticle = (num) => ({
  type: SET_ARTICLE,
  payload: num,
});

export const togglePost = (num) => ({
  type: TOGGLE_POST,
  payload: num,
});
