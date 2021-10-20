import { initialState } from "../initialState";
import { SET_POSTS_DATA, SET_ARTICLE } from "../actions/actions";

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
        togglePost: true,
      };
    default:
      return state;
  }
}

export default reducer;
