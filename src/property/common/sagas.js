import Qs from 'qs';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import {call, put, select, takeLatest, fork} from 'redux-saga/effects';
import {ACTION_TYPES} from './actions';
import {API} from './api';
import {ACTIONS as APP_ACTIONS} from './../../app/common/actions';
import {SELECTORS} from './selectors';
import {SELECTORS as APP_SELECTORS} from './../../app/common/selectors';
import {SELECTORS as AUTH_SELECTORS} from './../../auth/common/selectors';
import {getFileExtension, getFileName} from './../../common/functions';
import {NavigationActions} from 'react-navigation';
import find from 'lodash/find';

function* fetchProperties() {
  try {
    const state = yield select();
    const country = APP_SELECTORS.getSelectedCountry(state).fullName;
    const apiToken = AUTH_SELECTORS.getAuthToken(state);
    const type = SELECTORS.getSelectedPropertyType(state);
    const filters = SELECTORS.getFilters(state);

    const params = Qs.stringify({
      api_token: apiToken,
      country,
      type,
      ...filters,
    });

    const {nextPageUrl} = state.propertyReducer;

    // check if there is next page
    if (nextPageUrl === null) {
      yield put({
        type: ACTION_TYPES.PROPERTY_FAILURE,
        error: 'No More Results',
      });
    } else {
      // initial query

      let urlParams = nextPageUrl ? nextPageUrl : `/?${params}`;

      const response = yield call(API.fetchProperties, urlParams);

      yield put({
        type: ACTION_TYPES.PROPERTY_SUCCESS,
        payload: response.data,
      });

      if (response.data.data && response.data.data.length === 0) {
        yield put({
          type: ACTION_TYPES.PROPERTY_RELATED_REQUEST,
        });
      }

      if(!nextPageUrl) {
        yield put({
          type: ACTION_TYPES.PROPERTY_ADD_ITEM_TO_HISTORY_REQUEST,
          payload: {
            type,
            country,
            filters,
            total: response.data.total,
          },
        });
      }
    }
  } catch (error) {
    yield put({type: ACTION_TYPES.PROPERTY_FAILURE, error});
  }
}

function* fetchRelatedProperties() {
  try {
    const state = yield select();
    const country = APP_SELECTORS.getSelectedCountry(state).fullName;
    const apiToken = AUTH_SELECTORS.getAuthToken(state);
    const type = SELECTORS.getSelectedPropertyType(state);

    const params = Qs.stringify({
      api_token: apiToken,
      country,
      type,
    });

    let urlParams = `/?${params}`;

    const response = yield call(API.fetchProperties, urlParams);
    yield put({
      type: ACTION_TYPES.PROPERTY_RELATED_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.PROPERTY_RELATED_FAILURE, error});
  }
}

function* fetchMyProperties(action) {
  try {
    const state = yield select();
    const apiToken = AUTH_SELECTORS.getAuthToken(state);
    const propertyReducer = state.authReducer.token;

    const params = Qs.stringify({
      api_token: apiToken,
      all: true,
    });
    const {myNextPageUrl} = propertyReducer;
    let urlParams;

    // check if there is next page
    if (myNextPageUrl === null) {
      yield put({
        type: ACTION_TYPES.MY_PROPERTY_FAILURE,
        error: 'No More Results',
      });
    } else {
      // initial query
      if (myNextPageUrl === undefined) {
        urlParams = isEmpty(action.params) || action.params === undefined
          ? `/?${params}`
          : `/?${action.params}&${params}`;
      } else {
        urlParams = myNextPageUrl;
      }

      const response = yield call(API.fetchMyProperties, urlParams);
      yield put({
        type: ACTION_TYPES.MY_PROPERTY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({type: ACTION_TYPES.MY_PROPERTY_FAILURE, error});
  }
}

function* addItemToHistory(action) {
  const state = yield select();
  const historyReducer = state.propertyHistoryReducer;

  const {type, filters, country, total} = action.payload;

  // search history
  let newFilters = {
    [type]: {
      ...filters,
      country,
    },
  };

  let found = find(historyReducer, newFilters);

  if (found) {
    yield put({
      type: ACTION_TYPES.PROPERTY_REMOVE_ITEM_FROM_HISTORY,
      payload: found,
    });
  }

  let payload = {
    [type]: {
      ...filters,
      country,
      total,
    },
  };

  yield put({
    type: ACTION_TYPES.PROPERTY_ADD_ITEM_TO_HISTORY,
    payload: payload,
  });
}

function* fetchFavorites(action) {
  try {
    const state = yield select();
    const country = APP_SELECTORS.getSelectedCountry(state).fullName;
    const apiToken = AUTH_SELECTORS.getAuthToken(state);
    const {nextPageFavoritesUrl} = state.propertyReducer;
    let urlParams;
    // set if there is no next page
    if (nextPageFavoritesUrl === null) {
      return yield put({
        type: ACTION_TYPES.FAVORITES_FAILURE,
        error: 'No Results',
      });
    }

    const params = Qs.stringify({api_token: apiToken, country});

    if (nextPageFavoritesUrl === undefined) {
      urlParams = isEmpty(action.params) ? `/?${params}` : `/?${action.params}&${params}`;
    } else {
      urlParams = nextPageFavoritesUrl;
    }
    const response = yield call(API.fetchFavorites, urlParams);
    yield put({type: ACTION_TYPES.FAVORITES_SUCCESS, payload: response.data});
  } catch (error) {
    yield put({type: ACTION_TYPES.FAVORITES_FAILURE, error});
  }
}

function* favoriteProperty(action) {
  try {
    const state = yield select();
    const apiToken = AUTH_SELECTORS.getAuthToken(state);

    if (isEmpty(apiToken)) {
      yield put(APP_ACTIONS.setNotification('Please Login', 'error'));
      return yield put(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
    }

    yield put({
      type: ACTION_TYPES.PROPERTY_FAVORITE_OPTIMISTIC_UPDATE,
      payload: action,
    });
    const urlParams = `?api_token=${apiToken}`;
    const response = yield call(API.favoriteProperty, urlParams, action.params);
    yield put({
      type: ACTION_TYPES.PROPERTY_FAVORITE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.PROPERTY_FAVORITE_FAILURE, error});
  }
}

function* deleteProperty(action) {
  try {
    const state = yield select();
    const apiToken = AUTH_SELECTORS.getAuthToken(state);

    if (isEmpty(apiToken)) {
      yield put(APP_ACTIONS.setNotification('Please Login', 'error'));
      return yield put(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
    }
    const urlParams = `?api_token=${apiToken}`;
    const response = yield call(API.deleteProperty, urlParams, action.params);

    yield put({
      type: ACTION_TYPES.PROPERTY_DELETE_SUCCESS,
      payload: response,
    });
    yield put(APP_ACTIONS.setNotification('Property Deleted', 'success'));
  } catch (error) {
    yield put({type: ACTION_TYPES.PROPERTY_DELETE_FAILURE, error});
  }
}

function* saveProperty(action) {
  try {
    const state = yield select();
    const country = APP_SELECTORS.getSelectedCountry(state).fullName;
    const apiToken = AUTH_SELECTORS.getAuthToken(state);

    if (isEmpty(apiToken)) {
      yield put({type: ACTION_TYPES.PROPERTY_SAVE_FAILURE});
      yield put(APP_ACTIONS.setNotification('Please Login', 'error'));
      return yield put(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
    }

    let attributes = action.payload;
    let propertyID = attributes._id ? attributes._id : null;
    const {
      type,
      category,
      description,
      price,
      address,
      meta,
      images,
      amenities,
      nearByPlaces,
      tags,
      video,
    } = attributes;

    //@todo: localize
    let title = `${meta.bedroom} Bedroom ${category} ${type} in ${address.city}`;
    const params = {
      _id: propertyID,
      country,
      type,
      category,
      title,
      description,
      price,
      address,
      meta,
      images,
      amenities,
      nearByPlaces,
      tags,
      video,
    };

    const urlParams = `api_token=${apiToken}`;
    const response = yield call(API.saveProperty, params, urlParams);

    const formData = new FormData();

    map(images, img => {
      formData.append('images[]', {
        uri: img,
        name: getFileName(img),
        type: getFileExtension(img),
      });
    });
    // if(params.video) {
    //   formData.append("video", params.video);
    // }
    const imageResponse = yield call(API.uploadImage, response.data._id, formData);

    yield put({
      type: ACTION_TYPES.PROPERTY_SAVE_SUCCESS,
      payload: imageResponse,
    });

    yield put(APP_ACTIONS.setNotification('Property Saved', 'success'));
    yield put(
      NavigationActions.navigate({
        routeName: 'PropertyCreateTab',
      }),
    );
  } catch (error) {
    yield put({type: ACTION_TYPES.PROPERTY_SAVE_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}

function* setFilters() {
  yield put({type: ACTION_TYPES.PROPERTY_RESET});
}

function* incrementViews(action) {
  let propertyID = action.propertyID;
  yield call(API.incrementViews, propertyID);
}

// Monitoring Sagas
function* propertyMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_REQUEST, fetchProperties);
}

function* propertyRelatedMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_RELATED_REQUEST, fetchRelatedProperties);
}
function* myPropertyMonitor() {
  yield takeLatest(ACTION_TYPES.MY_PROPERTY_REQUEST, fetchMyProperties);
}

function* favoriteMonitor() {
  yield takeLatest(ACTION_TYPES.FAVORITES_REQUEST, fetchFavorites);
}

function* propertyFavoriteMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_FAVORITE_REQUEST, favoriteProperty);
}

function* propertyDeleteMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_DELETE_REQUEST, deleteProperty);
}

function* propertySaveMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_SAVE_REQUEST, saveProperty);
}

function* propertyFiltersSetMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_SET_FILTERS_REQUEST, setFilters);
}

function* propertyIncrementViewCount() {
  yield takeLatest(ACTION_TYPES.PROPERTY_INCREMENT_VIEW_COUNT, incrementViews);
}

function* propertyHistoryMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_ADD_ITEM_TO_HISTORY_REQUEST, addItemToHistory);
}

export default (PROPERTY_SAGA = [
  fork(propertyMonitor),
  fork(propertyRelatedMonitor),
  fork(myPropertyMonitor),
  fork(favoriteMonitor),
  fork(propertyFavoriteMonitor),
  fork(propertySaveMonitor),
  fork(propertyFiltersSetMonitor),
  fork(propertyIncrementViewCount),
  fork(propertyDeleteMonitor),
  fork(propertyHistoryMonitor),
]);
