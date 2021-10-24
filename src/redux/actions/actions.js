export const SET_POSTS_DATA = "SET_POSTS_DATA";
export const GET_NEXT_PAGE = "GET_NEXT_PAGE";
export const SET_ARTICLE = "GET_ARTICLE";
export const LOGGED_IN = "LOGGED_IN";
export const IS_ERROR_SIGN_IN = "IS_ERROR_SIGN_IN";
export const SHOW_ALERT = "SHOW_ALERT";

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

export const loggedIn = (num) => ({
  type: LOGGED_IN,
  payload: num,
});

export const isErrorSignIn = (num) => ({
  type: IS_ERROR_SIGN_IN,
  payload: num,
});

export const showAlert = (num) => ({
  type: SHOW_ALERT,
  payload: num,
});
