import {API_URL} from '../../env';
import {fetchAPI} from '../../common/api';

function fetchProperties(params) {
  const url = `${API_URL}/properties${params}`;
  return fetchAPI(url);
}

function fetchMyProperties(params) {
  const url = `${API_URL}/properties/self${params}`;
  return fetchAPI(url);
}

function fetchFavorites(params) {
  const url = `${API_URL}/favorites${params}`;
  return fetchAPI(url);
}

function favoriteProperty(urlParams, body) {
  const url = `${API_URL}/favorites${urlParams}`;
  return fetchAPI(url, 'POST', body);
}

function deleteProperty(urlParams, body) {
  const url = `${API_URL}/properties/delete${urlParams}`;
  return fetchAPI(url, 'POST', body);
}

function saveProperty(body, urlParams) {
  const url = `${API_URL}/properties?${urlParams}`;
  return fetchAPI(url, 'POST', body);
}

function uploadImage(propertyID, body) {
  const url = `${API_URL}/properties/${propertyID}/images/upload`;
  return fetchAPI(url, 'POST', body, true);
}

function incrementViews(propertyID) {
  const url = `${API_URL}/properties/${propertyID}/increment-view`;
  try {
    fetchAPI(url);
  } catch (e) {
    console.log('e', e);
  }
}

export const API = {
  fetchProperties,
  fetchMyProperties,
  fetchFavorites,
  favoriteProperty,
  saveProperty,
  uploadImage,
  incrementViews,
  deleteProperty,
};
