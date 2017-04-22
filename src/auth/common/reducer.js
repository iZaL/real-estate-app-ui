import {ACTION_TYPES} from './actions';

const initialState = {
  isAuthenticated: false,
  userID: null,
  token: null,
  skipped: false,
  showPasswordUpdateScene: false,
  showPasswordRecoverScene: false,
  login: {
    busy: false,
    error: null,
  },
  register: {
    busy: false,
    error: null,
  },
};

export default function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        userID: null,
        login: {...state.login, busy: true, error: null},
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isAuthenticated: true,
        token: action.payload.api_token,
        userID: action.payload._id,
        login: {...state.login, busy: false, error: null},
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        login: {...state.login, busy: false, error: action.error},
      };
    case ACTION_TYPES.REGISTER_REQUEST:
      return {
        ...state,
        register: {...state.register, busy: true, error: null},
      };
    case ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        register: {...state.register, busy: false, error: null},
      };
    case ACTION_TYPES.REGISTER_FAILURE:
      return {
        ...state,
        register: {...state.register, busy: false, error: action.error},
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case ACTION_TYPES.FORGOT_PASSWORD_SUCCESS:
      return {
        ...initialState,
        showPasswordRecoverScene: true,
        showPasswordUpdateScene: false,
      };
    case ACTION_TYPES.RECOVER_PASSWORD_SUCCESS:
      return {
        ...initialState,
        showPasswordRecoverScene: false,
        showPasswordUpdateScene: true,
      };
    case ACTION_TYPES.PASSWORD_UPDATE_SUCCESS:
      return {
        ...initialState,
        showPasswordUpdateScene: false,
        showPasswordRecoverScene: false,
      };
    default:
      return state;
  }
}
