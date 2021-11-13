import { initialState } from "../initialState";
import {
  SET_POSTS_DATA,
  SET_ARTICLE,
  LOGGED_IN,
  PROFILE_UPDATED,
  TOGGLE_ARTICLE,
  TOTAL_COUNT,
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
    default:
      return state;
  }
}

export default reducer;
