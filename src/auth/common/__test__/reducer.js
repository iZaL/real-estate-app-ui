import authReducer from '../reducer';
import {ACTION_TYPES} from '../actions';

describe('App Component Store', () => {
  let initialState = {
    isAuthenticated: false,
    userID: null,
    token: null,
    skipped: false,
    login: {
      busy: false,
      error: null,
    },
    register: {
      busy: false,
      error: null,
    },
  };

  test('should return the initial state', () => {
    expect(authReducer(initialState, {type: 'UNDEFINED'})).toEqual(
      initialState,
    );
  });

  test('login request', () => {
    expect(
      authReducer(initialState, {type: ACTION_TYPES.LOGIN_REQUEST}),
    ).toEqual({
      ...initialState,
      isAuthenticated: false,
      userID: null,
      login: {busy: true, error: null},
    });
  });

  test('login success', () => {
    expect(
      authReducer(initialState, {
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: {
          api_token: 'token',
          _id: 123,
        },
      }),
    ).toEqual({
      ...initialState,
      error: null,
      isAuthenticated: true,
      token: 'token',
      userID: 123,
      login: {...initialState.login, busy: false, error: null},
    });
  });

  test('login failure', () => {
    expect(
      authReducer(initialState, {
        type: ACTION_TYPES.LOGIN_FAILURE,
        error: 'login failed',
      }),
    ).toEqual({
      ...initialState,
      isAuthenticated: false,
      userID: null,
      login: {...initialState.login, busy: false, error: 'login failed'},
    });
  });

  test('register request', () => {
    expect(
      authReducer(initialState, {type: ACTION_TYPES.REGISTER_REQUEST}),
    ).toEqual({
      ...initialState,
      register: {...initialState.register, busy: true},
    });
  });

  test('register success', () => {
    expect(
      authReducer(initialState, {type: ACTION_TYPES.REGISTER_SUCCESS}),
    ).toEqual({
      ...initialState,
      register: {...initialState.register, busy: false},
    });
  });

  test('register failure', () => {
    expect(
      authReducer(initialState, {
        type: ACTION_TYPES.REGISTER_FAILURE,
        error: 'registration failed',
      }),
    ).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        busy: false,
        error: 'registration failed',
      },
    });
  });

  test('logout', () => {
    expect(authReducer(initialState, {type: ACTION_TYPES.LOGOUT})).toEqual({
      ...initialState,
    });
  });
});
