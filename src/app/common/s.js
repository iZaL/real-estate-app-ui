import {call, put, takeLatest, fork, all, select} from 'redux-saga/effects';
import {getItem as getStorageItem, setItem} from '../../common/storage';
import {API as AUTH_API} from '../../auth/common/api';
import {AUTH_STORAGE_KEY} from '../../auth/common/reducer';
import {ACTION_TYPES as AUTH_ACTION_TYPES} from '../../auth/common/actions';
import {ACTION_TYPES} from './actions';
import {BOOTSTRAPPED_STORAGE_KEY, LANGUAGE_STORAGE_KEY} from './reducer';
import {normalize} from 'normalizr';
import Schema from '../../user/common/schema';
import isNull from 'lodash/isNull';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

function* bootstrapped(action) {
  if (action.value === true) {
    yield call(setItem, BOOTSTRAPPED_STORAGE_KEY, 'bootstrapped');
  }
}

function* boot() {
  const authStorageKey = yield call(getStorageItem, AUTH_STORAGE_KEY);

  const bootstrappedStorageKey = yield call(
    getStorageItem,
    BOOTSTRAPPED_STORAGE_KEY,
  );

  let currentLanguage = yield call(getStorageItem, LANGUAGE_STORAGE_KEY);

  if (isNull(bootstrappedStorageKey)) {
    yield put({type: ACTION_TYPES.BOOTSTRAPPED, value: false});
  } else {
    yield put({type: ACTION_TYPES.BOOTSTRAPPED, value: true});
  }

  if (!isNull(authStorageKey)) {
    try {
      let response = yield call(AUTH_API.login, null, authStorageKey);
      const normalized = normalize(response.data, Schema.users);
      yield put({
        type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
        entities: normalized.entities,
        payload: response.data,
      });
    } catch (error) {
      yield put({type: AUTH_ACTION_TYPES.LOGIN_FAILURE, error});
    }
  }

  if (!isNull(currentLanguage)) {
    yield put({
      type: ACTION_TYPES.SET_LANGUAGE_SUCCESS,
      language: currentLanguage,
    });
  }

  if (currentLanguage === 'en') {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  } else {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }

  if (I18nManager.isRTL && currentLanguage === 'en') {
    I18nManager.allowRTL(false);
    RNRestart.Restart();
  }

  if (!I18nManager.isRTL && currentLanguage === 'ar') {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    RNRestart.Restart();
  }

  // Whether this app has loaded before
  if (!isNull(bootstrappedStorageKey)) {
    yield put({
      type: ACTION_TYPES.BOOTSTRAPPED,
      value: true,
    });
  }

  yield put({type: ACTION_TYPES.BOOT_SUCCESS});
}

function* setLanguage(action) {
  let state = yield select();
  let currentLanguage = state.appReducer.language;

  if (currentLanguage === action.language) return;

  yield call(setItem, LANGUAGE_STORAGE_KEY, action.language);

  yield put({
    type: ACTION_TYPES.SET_LANGUAGE_SUCCESS,
    language: action.language,
  });
}

export function* bootMonitor() {
  yield takeLatest(ACTION_TYPES.BOOT_REQUEST, boot);
}

export function* bootstrappedMonitor() {
  yield takeLatest(ACTION_TYPES.BOOTSTRAPPED, bootstrapped);
}

export function* setLanguageMonitor() {
  yield takeLatest(ACTION_TYPES.SET_LANGUAGE_REQUEST, setLanguage);
}

export default (APP_SAGAS = all([
  fork(bootMonitor),
  fork(bootstrappedMonitor),
  fork(setLanguageMonitor),
]));
