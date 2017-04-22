import {ACTION_TYPES, ACTIONS} from '../actions';

describe('App Component Actions', () => {
  test('returns expected action', () => {
    const expected = {
      type: ACTION_TYPES.LOGIN_REQUEST,
    };
    const actual = ACTIONS.login();
    expect(actual).toEqual(expected);
  });

  test('returns expected action', () => {
    const expected = {
      type: ACTION_TYPES.LOGOUT,
    };
    const actual = ACTIONS.logout();
    expect(actual).toEqual(expected);
  });

  test('returns expected action', () => {
    const expected = {
      type: ACTION_TYPES.REGISTER_REQUEST,
    };
    const actual = ACTIONS.register();
    expect(actual).toEqual(expected);
  });
});
