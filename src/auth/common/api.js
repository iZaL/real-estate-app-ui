import isNull from 'lodash/isNull';
import {API_URL} from '../../env';
import {fetchAPI} from '../../common/api';

export const AUTH_STORAGE_KEY = 'AUTH_TOKEN_!@###';

function login(params, token) {
  if (isNull(token) && isNull(params)) return;
  const url = isNull(token) ? `${API_URL}/auth/login` : `${API_URL}/auth/login?api_token=${token}`;
  return fetchAPI(url, 'POST', params);
}

function register(params) {
  const url = `${API_URL}/auth/register`;
  return fetchAPI(url, 'POST', params);
}

function forgotPassword(params) {
  const url = `${API_URL}/auth/password/forgot`;
  return fetchAPI(url, 'POST', params);
}

function recoverPassword(params) {
  const url = `${API_URL}/auth/password/recover`;
  return fetchAPI(url, 'POST', params);
}

function updatePassword(params) {
  const url = `${API_URL}/auth/password/update`;
  return fetchAPI(url, 'POST', params);
}

export const API = {
  login,
  register,
  recoverPassword,
  forgotPassword,
  updatePassword,
};
