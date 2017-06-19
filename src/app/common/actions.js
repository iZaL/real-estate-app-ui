export const ACTION_TYPES = {
  BOOT_REQUEST: 'BOOT_REQUEST',
  BOOT_SUCCESS: 'BOOT_SUCCESS',
  BOOTSTRAPPED: 'BOOTSTRAPPED',
  CHANGE_COUNTRY: 'CHANGE_COUNTRY',
  COUNTRY_CHANGED: 'COUNTRY_CHANGED',
  DISMISS_NOTIFICATION: 'DISMISS_NOTIFICATION',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  SET_LANGUAGE_REQUEST: 'SET_LANGUAGE_REQUEST',
  SET_LANGUAGE_SUCCESS: 'SET_LANGUAGE_SUCCESS',
};

function boot() {
  return {
    type: ACTION_TYPES.BOOT_REQUEST,
  };
}

function changeCountry(country) {
  return {
    type: ACTION_TYPES.CHANGE_COUNTRY,
    country,
  };
}
function setBootstrapped(value) {
  return {
    type: ACTION_TYPES.BOOTSTRAPPED,
    value,
  };
}
function setLanguage(value) {
  return {
    type: ACTION_TYPES.SET_LANGUAGE_REQUEST,
    language: value,
  };
}

function dismissNotification() {
  return {
    type: ACTION_TYPES.DISMISS_NOTIFICATION,
  };
}

function setNotification(message, messageType) {
  return {
    type: ACTION_TYPES.SET_NOTIFICATION,
    payload: {
      message: message,
      messageType: messageType,
    },
  };
}

export const ACTIONS = {
  boot,
  changeCountry,
  dismissNotification,
  setNotification,
  setBootstrapped,
  setLanguage,
};
