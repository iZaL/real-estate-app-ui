import {call, put, select, takeLatest, fork} from 'redux-saga/effects';
import {ACTION_TYPES} from './actions';
import {API} from './api';
import isEmpty from 'lodash/isEmpty';
import {getFileName} from '../../common/functions';
import {SELECTORS as AUTH_SELECTORS} from '../../auth/common/selectors';

function* updateUser(action) {
  try {
    const state = yield select();
    const apiToken = AUTH_SELECTORS.getAuthToken(state);
    const urlParams = `api_token=${apiToken}`;
    const {name, image, company} = action.params;
    const params = {
      name,
      company,
    };
    const response = yield call(API.updateUser, params, urlParams);
    if (isEmpty(image)) {
      yield put({
        type: ACTION_TYPES.USER_UPDATE_SUCCESS,
        payload: response.data,
      });
    } else {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: getFileName(image),
        type: 'image/jpg',
      });
      const imageResponse = yield call(API.uploadImage, formData, urlParams);
      yield put({
        type: ACTION_TYPES.USER_UPDATE_SUCCESS,
        payload: imageResponse.data,
      });
    }
  } catch (error) {
    yield put({type: ACTION_TYPES.USER_UPDATE_FAILURE, error});
  }
}

function* userUpdateMonitor() {
  yield takeLatest(ACTION_TYPES.USER_UPDATE_REQUEST, updateUser);
}

export default (USER_SAGA = [fork(userUpdateMonitor)]);
