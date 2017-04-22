import isNull from 'lodash/isNull';
import {call, put, select, takeLatest, fork} from 'redux-saga/effects';
import {getItem as getStoredItem, setItem} from '../../common/storage';
import {API as AUTH_API, AUTH_STORAGE_KEY} from '../../auth/common/api';
import {ACTION_TYPES as AUTH_ACTION_TYPES} from '../../auth/common/actions';
import {ACTION_TYPES as PROPERTY_ACTION_TYPES} from '../../property/common/actions';
import {ACTION_TYPES} from './actions';
import {COUNTRY_KEY, BOOTSTRAPPED} from './reducer';

function* bootstrap(action) {
  if (action.value === true) {
    yield call(setItem, BOOTSTRAPPED, 'bootstrapped');
  }
}

function* bootApp() {
  let token = yield call(getStoredItem, AUTH_STORAGE_KEY);
  let currentCountry = yield call(getStoredItem, COUNTRY_KEY);
  let bootstrapped = yield call(getStoredItem, BOOTSTRAPPED);
  let state = yield select();

  if (isNull(bootstrapped)) {
    yield put({type: ACTION_TYPES.BOOTSTRAPPED, value: false});
  } else {
    yield put({type: ACTION_TYPES.BOOTSTRAPPED, value: true});
  }

  if (isNull(currentCountry)) {
    currentCountry = state.appReducer.selectedCountry;
  }

  if (!isNull(token)) {
    try {
      let response = yield call(AUTH_API.login, null, token);
      yield put({
        type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      yield put({type: AUTH_ACTION_TYPES.LOGIN_FAILURE, error});
    }
  }

  yield put({type: ACTION_TYPES.COUNTRY_CHANGED, country: currentCountry});
  yield put({type: ACTION_TYPES.BOOT_SUCCESS});
}

function* changeCountrySaga(action) {
  let state = yield select();
  let currentCountry = state.appReducer.selectedCountry;

  if (currentCountry === action.country) return;

  yield call(setItem, COUNTRY_KEY, action.country);
  yield put({type: ACTION_TYPES.COUNTRY_CHANGED, country: action.country});
  yield put({type: PROPERTY_ACTION_TYPES.PROPERTY_RESET});
  yield put({type: PROPERTY_ACTION_TYPES.PROPERTY_REQUEST});
}

function* bootMonitor() {
  yield takeLatest(ACTION_TYPES.BOOT_REQUEST, bootApp);
}
function* bootstrapMonitor() {
  yield takeLatest(ACTION_TYPES.BOOTSTRAPPED, bootstrap);
}

function* changeCountryMonitor() {
  yield takeLatest(ACTION_TYPES.CHANGE_COUNTRY, changeCountrySaga);
}

export default (APP_SAGA = [fork(bootMonitor), fork(bootstrapMonitor), fork(changeCountryMonitor)]);
