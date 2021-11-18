import { initialState } from "../initialState";
import {
  SET_POSTS_DATA,
  SET_ARTICLE,
  LOGGED_IN,
  PROFILE_UPDATED,
  TOGGLE_ARTICLE,
  TOTAL_COUNT,
  LIKE,
  DIS_LIKE,
} from "../actions/actions";

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS_DATA:
      return {
        ...state,
        dataPosts: action.payload,
      };
    case TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload,
      };

    case SET_ARTICLE:
      return {
        ...state,
        article: action.payload,
        isLoaded: true,
      };
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case PROFILE_UPDATED:
      return {
        ...state,
        profileUpdated: action.payload,
      };
    case TOGGLE_ARTICLE:
      return {
        ...state,
        toggleArticle: action.payload,
      };
    case LIKE:
      return {
        ...state,
        dataPosts: state.dataPosts.map((post) => {
          if (post.slug === action.slug) {
            return action;
          }
          return post;
        }),
        // article: action,
      };
    case DIS_LIKE:
      return {
        ...state,
        dataPosts: state.dataPosts.map((post) => {
          if (post.slug === action.slug) {
            return action
          }
          return post;
        }),
        // article: action,
      };
    default:
      return state;
  }
}

export default reducer;
