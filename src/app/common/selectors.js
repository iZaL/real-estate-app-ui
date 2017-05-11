import {createSelector} from 'reselect';

const getCountriesObject = state => state.appReducer.countries;
const getCountry = state => state.appReducer.selectedCountry;

const getCountries = createSelector(getCountriesObject, countries =>
  Object.keys(countries),
);
const getSelectedCountry = createSelector(
  getCountriesObject,
  getCountry,
  (countries, country) => countries[country],
);

export const SELECTORS = {
  getCountries,
  getSelectedCountry,
  getCountriesObject,
};
