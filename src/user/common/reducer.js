import {ACTION_TYPES} from './actions';

const initialState = {
  isFetching: false,
  error: null,
  nextPageUrl: undefined,
  results: [],
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.USER_REQUEST:
      return {...state, isFetching: true, error: null};
    case ACTION_TYPES.USER_SUCCESS:
      return {...state, isFetching: false, error: null};
    case ACTION_TYPES.USER_FAILURE:
      return {...state, isFetching: false, error: action.error};
    default:
      return state;
  }
}
