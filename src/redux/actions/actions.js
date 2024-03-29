export const SET_POSTS_DATA = "SET_POSTS_DATA";
export const GET_NEXT_PAGE = "GET_NEXT_PAGE";
export const SET_ARTICLE = "GET_ARTICLE";
export const SET_NULL_ARTICLE = "SET_NULL_ARTICLE";
export const LOGGED_IN = "LOGGED_IN";
export const PROFILE_UPDATED = "PROFILE_UPDATED";
export const TOGGLE_ARTICLE = "TOGGLE_ARTICLE";
export const TOTAL_COUNT = "TOTAL_COUNT";
export const SET_PAGE = "SET_PAGE";
export const SET_LOADING = "SET_LOADING";

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

export const setNullArticle = (num) => ({
  type: SET_NULL_ARTICLE,
  payload: num,
});

export const loggedIn = (num) => ({
  type: LOGGED_IN,
  payload: num,
});

export const updatedProfile = (num) => ({
  type: PROFILE_UPDATED,
  payload: num,
});

export const toggleArticleComponent = (num) => ({
  type: TOGGLE_ARTICLE,
  payload: num,
});

export const setTotalArticles = (num) => ({
  type: TOTAL_COUNT,
  payload: num,
});

export const setPage = (num) => ({
  type: SET_PAGE,
  payload: num,
});

export const setLoading = (num) => ({
  type: SET_LOADING,
  payload: num,
});
