export const ACTION_TYPES = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST',
  FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILURE: 'FORGOT_PASSWORD_FAILURE',
  RECOVER_PASSWORD_REQUEST: 'RECOVER_PASSWORD_REQUEST',
  RECOVER_PASSWORD_SUCCESS: 'RECOVER_PASSWORD_SUCCESS',
  RECOVER_PASSWORD_FAILURE: 'RECOVER_PASSWORD_FAILURE',
  PASSWORD_UPDATE_REQUEST: 'PASSWORD_UPDATE_REQUEST',
  PASSWORD_UPDATE_SUCCESS: 'PASSWORD_UPDATE_SUCCESS',
  PASSWORD_UPDATE_FAILURE: 'PASSWORD_UPDATE_FAILURE',
};

function login(credentials, navigation) {
  return {
    type: ACTION_TYPES.LOGIN_REQUEST,
    credentials,
    navigation: navigation,
  };
}

function logout() {
  return {
    type: ACTION_TYPES.LOGOUT,
  };
}

function forgotPassword(params) {
  return {
    type: ACTION_TYPES.FORGOT_PASSWORD_REQUEST,
    params: params,
  };
}

function recoverPassword(params) {
  return {
    type: ACTION_TYPES.RECOVER_PASSWORD_REQUEST,
    params: params,
  };
}
function updatePassword(params) {
  return {
    type: ACTION_TYPES.PASSWORD_UPDATE_REQUEST,
    params: params,
  };
}

function register(params) {
  return {
    type: ACTION_TYPES.REGISTER_REQUEST,
    params,
  };
}

export const ACTIONS = {
  login,
  register,
  logout,
  recoverPassword,
  forgotPassword,
  updatePassword,
};
