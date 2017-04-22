import {call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {NavigationActions} from 'react-navigation';

import {ACTION_TYPES} from './actions';
import {ACTION_TYPES as APP_ACTION_TYPES, ACTIONS as APP_ACTIONS} from './../../app/common/actions';
import {ACTION_TYPES as PROPERTY_ACTIONS} from '../../property/common/actions';
import {API, AUTH_STORAGE_KEY} from './api';
import {SELECTORS} from './selectors';

import {forgetItem, setItem} from '../../common/storage';

function* login(action) {
  try {
    const state = yield select();
    const token = SELECTORS.getAuthToken(state);
    const response = yield call(API.login, action.credentials, token);

    yield put({type: ACTION_TYPES.LOGIN_SUCCESS, payload: response.data});
    yield call(setItem, AUTH_STORAGE_KEY, response.data.api_token);

    yield put({type: PROPERTY_ACTIONS.PROPERTY_RESET});
    yield put({type: PROPERTY_ACTIONS.PROPERTY_REQUEST});

    yield put(NavigationActions.back());
  } catch (error) {
    yield put({type: ACTION_TYPES.LOGIN_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}

function* register(action) {
  try {
    const response = yield call(API.register, action.params);
    yield put({type: ACTION_TYPES.REGISTER_SUCCESS, payload: response.data});
    yield put(APP_ACTIONS.setNotification('Registration Success', 'success'));
    yield put(NavigationActions.back());
  } catch (error) {
    yield put({type: ACTION_TYPES.REGISTER_FAILURE, error});
    yield put({
      type: APP_ACTION_TYPES.SET_NOTIFICATION,
      payload: {
        message: error,
        messageType: 'error',
      },
    });
  }
}

function* forgotPassword(action) {
  try {
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

    if (!emailPattern.test(action.params.email)) {
      return yield put(APP_ACTIONS.setNotification('Invalid Email', 'error'));
    }

    const response = yield call(API.forgotPassword, action.params);

    yield put({
      type: ACTION_TYPES.FORGOT_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.FORGOT_PASSWORD_FAILURE, error});
  }
}

function* recoverPassword(action) {
  try {
    const response = yield call(API.recoverPassword, action.params);
    yield put({
      type: ACTION_TYPES.RECOVER_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.RECOVER_PASSWORD_FAILURE, error});
  }
}

function* updatePassword(action) {
  try {
    const response = yield call(API.updatePassword, action.params);

    if (action.params.password !== action.params.password_confirmation) {
      return yield put(APP_ACTIONS.setNotification('Password does not match', 'error'));
    }

    yield put({
      type: ACTION_TYPES.PASSWORD_UPDATE_SUCCESS,
      payload: response.data,
    });

    yield put(NavigationActions.back(null));
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.PASSWORD_UPDATE_FAILURE, error});
  }
}

function* logout() {
  yield call(forgetItem, AUTH_STORAGE_KEY);
}

// Monitoring Sagas
function* loginMonitor() {
  yield takeLatest(ACTION_TYPES.LOGIN_REQUEST, login);
}

function* logoutMonitor() {
  yield takeLatest(ACTION_TYPES.LOGOUT, logout);
}

function* registerMonitor() {
  yield takeLatest(ACTION_TYPES.REGISTER_REQUEST, register);
}

function* forgotPasswordMonitor() {
  yield takeLatest(ACTION_TYPES.FORGOT_PASSWORD_REQUEST, forgotPassword);
}

function* recoverPasswordMonitor() {
  yield takeLatest(ACTION_TYPES.RECOVER_PASSWORD_REQUEST, recoverPassword);
}
function* passwordUpdateMonitor() {
  yield takeLatest(ACTION_TYPES.PASSWORD_UPDATE_REQUEST, updatePassword);
}

export default (AUTH_SAGA = [
  fork(loginMonitor),
  fork(logoutMonitor),
  fork(registerMonitor),
  fork(recoverPasswordMonitor),
  fork(forgotPasswordMonitor),
  fork(passwordUpdateMonitor),
]);
