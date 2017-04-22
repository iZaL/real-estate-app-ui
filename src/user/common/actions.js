export const ACTION_TYPES = {
  USER_REQUEST: 'USER_REQUEST',
  USER_SUCCESS: 'USER_SUCCESS',
  USER_FAILURE: 'USER_FAILURE',
  USER_UPDATE_REQUEST: 'USER_UPDATE_REQUEST',
  USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS',
  USER_UPDATE_FAILURE: 'USER_UPDATE_FAILURE',
};

function fetchUser(params) {
  return {
    type: ACTION_TYPES.USER_REQUEST,
    params,
  };
}

function updateUser(params) {
  return {
    type: ACTION_TYPES.USER_UPDATE_REQUEST,
    params,
  };
}

export const ACTIONS = {
  fetchUser,
  updateUser,
};
