import {ACTION_TYPES} from './actions';
import {
  ACTION_TYPES as PROPERTY_ACTION_TYPES,
} from './../../property/common/actions';

export const COUNTRY_KEY = 'COUNTRY';
export const BOOTSTRAPPED = 'BOOTSTRAPPED';

// // reducer
const initialState = {
  bootstrapped: false,
  booted: false,
  selectedCountry: 'Kuwait',
  countries: {
    Kuwait: {
      fullName: 'Kuwait',
      abbr: 'KW',
      currency: 'KD',
      coords: {
        latitude: 29.3759,
        longitude: 47.9774,
      },
    },
    Bahrain: {
      fullName: 'Bahrain',
      abbr: 'BH',
      currency: 'BD',
      coords: {
        latitude: 29.3759,
        longitude: 47.9774,
      },
    },
    'Saudi Arabia': {
      fullName: 'Saudi Arabia',
      abbr: 'SA',
      currency: 'SR',
      coords: {
        latitude: 23.8859,
        longitude: 45.0792,
      },
    },
    'United Arab Emirates': {
      fullName: 'United Arab Emirates',
      abbr: 'AE',
      currency: 'DHS',
      coords: {
        latitude: 26.0667,
        longitude: 50.5577,
      },
    },
    Qatar: {
      fullName: 'Qatar',
      abbr: 'QA',
      currency: 'QR',
      coords: {
        latitude: 25.3548,
        longitude: 51.1839,
      },
    },
    Oman: {
      fullName: 'Oman',
      abbr: 'OM',
      currency: 'OMR',
      coords: {
        latitude: 21.4735,
        longitude: 55.9754,
      },
    },
  },
  notifications: {
    message: null,
    messageType: null,
  },
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.BOOTSTRAPPED:
      return {...state, bootstrapped: action.value};
    case ACTION_TYPES.BOOT_REQUEST:
      return {...state, booted: false};
    case ACTION_TYPES.BOOT_SUCCESS:
      return {...state, booted: true};
    case ACTION_TYPES.COUNTRY_CHANGED:
      return {...state, selectedCountry: action.country};
    case ACTION_TYPES.SET_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          message: action.payload.message,
          messageType: action.payload.messageType,
        },
      };
    case ACTION_TYPES.DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          message: null,
          type: null,
        },
      };
    case PROPERTY_ACTION_TYPES.PROPERTY_SET_FILTERS_REQUEST:
      return {
        ...state,
        selectedCountry: action.filters.country,
      };
    default:
      return state;
  }
}
