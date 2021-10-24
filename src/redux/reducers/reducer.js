import { initialState } from "../initialState";
import {
  SET_POSTS_DATA,
  SET_ARTICLE,
  LOGGED_IN,
  IS_ERROR_SIGN_IN,
  SHOW_ALERT,
} from "../actions/actions";

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS_DATA:
      return {
        ...state,
        dataPosts: action.payload,
        totalCount: action.payload.length,
      };

    case SET_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
        redirect: true,
      };
    case IS_ERROR_SIGN_IN:
      return {
        ...state,
        showErrorSignIn: action.payload,
      };
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
