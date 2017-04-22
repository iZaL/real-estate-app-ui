import orm from '../../common/orm';
import {createSelector} from 'reselect';
import {createSelector as ormSelector} from 'redux-orm';
import {SELECTORS as APP_SELECTORS} from './../../app/common/selectors';
import {SELECTORS as AUTH_SELECTORS} from './../../auth/common/selectors';

const ormReducer = state => state.ormReducer;

// Property Selectors
const propertyResults = state => state.propertyReducer.results;
const propertyRelatedResults = state => state.propertyReducer.relatedResults;
const propertySaving = state => state.propertyReducer.isSaving;
const propertyIsFetching = state => state.propertyReducer.isFetching;
const propertyIsRelatedFetching = state => state.propertyReducer.isRelatedFetching;
const propertyIsMyPropertiesFetching = state => state.propertyReducer.isMyPropertiesFetching;
const propertyIsFavoritesFetching = state => state.propertyReducer.isFavoritesFetching;
const propertyIsShowingRelated = state => state.propertyReducer.showRelated;
const propertyMapView = state => state.propertyReducer.mapView;
const propertyAddListing = state => state.propertyReducer.addListing;
const propertyEditListing = state => state.propertyReducer.editListing;
const propertySearchHistory = state => state.propertyHistoryReducer;
const getPropertyID = (state, props) => props.navigation.state.params.property._id;

const filterResults = ({Property, User}, results) =>
  results.map(id => {
    const property = Property.withId(id).ref;
    return Object.assign({}, property, {user: User.withId(property.user).ref});
  });

const getProperties = createSelector(
  ormReducer,
  propertyResults,
  ormSelector(orm, (ormSession, results) => filterResults(ormSession, results)),
);

const getRelatedProperties = createSelector(
  ormReducer,
  propertyRelatedResults,
  ormSelector(orm, (ormSession, results) => filterResults(ormSession, results)),
);

const getMyProperties = createSelector(
  ormReducer,
  AUTH_SELECTORS.getCurrentUserID,
  ormSelector(orm, ({Property, User}, userID) =>
    Property.all()
      .toRefArray()
      .filter(property => property.user === userID)
      .map(property => Object.assign({}, property, {user: User.withId(property.user).ref})),
  ),
);

const getFavorites = createSelector(
  ormReducer,
  ormSelector(orm, ({Property, User}) =>
    Property.all()
      .toRefArray()
      .filter(property => property.isFavorited)
      .map(property => Object.assign({}, property, {user: User.withId(property.user).ref})),
  ),
);

const getProperty = createSelector(
  ormReducer,
  getPropertyID,
  ormSelector(orm, ({Property, User}, id) => {
    const property = Property.withId(id).ref;
    return Object.assign({}, property, {
      user: User.withId(property.user).ref,
    });
  }),
);

const isFetching = createSelector(propertyIsFetching, isFetching => isFetching);
const isRelatedFetching = createSelector(propertyIsRelatedFetching, isFetching => isFetching);
const isMyPropertiesFetching = createSelector(propertyIsMyPropertiesFetching, isFetching => isFetching);
const isFavoritesFetching = createSelector(propertyIsFavoritesFetching, isFetching => isFetching);
const isShowingRelated = createSelector(propertyIsShowingRelated, showingRelated => showingRelated);
const getAddListing = createSelector(propertyAddListing, listings => listings);
const getEditListing = createSelector(propertyEditListing, listings => listings);
const getSaving = createSelector(propertySaving, saving => saving);
const getMapView = createSelector(propertyMapView, mapView => mapView);

// History Reducer
const getSearchHistory = createSelector(propertySearchHistory, history => history.slice().reverse().slice(0, 20));

//Options reducer
const propertyTypes = state => state.propertyOptionsReducer.propertyTypes;
const selectedPropertyType = state => state.propertyOptionsReducer.selectedPropertyType;
const propertyFilters = state => state.propertyOptionsReducer.filters;
const propertyGenders = state => state.propertyOptionsReducer.genders;
const propertyAmenities = state => state.propertyOptionsReducer.amenities;
const propertySortOptions = state => state.propertyOptionsReducer.sortOptions;
const propertyNearByPlaces = state => state.propertyOptionsReducer.nearByPlaces;
const propertyAddMetas = state => state.propertyOptionsReducer.addMetas;
const propertySearchMetas = state => state.propertyOptionsReducer.searchMetas;
const propertyCategories = state => state.propertyOptionsReducer.categories;
const propertyPrices = state => state.propertyOptionsReducer.prices;

//Options Selectors
const getSelectedPropertyType = createSelector(selectedPropertyType, type => type);
const getPropertyTypes = createSelector(propertyTypes, options => options);
const getFilters = createSelector(propertyFilters, selectedPropertyType, (filters, type) => filters[type]);
const getGenders = createSelector(propertyGenders, options => options);
const getAmenities = createSelector(propertyAmenities, options => options);
const getSortOptions = createSelector(propertySortOptions, options => options);
const getNearByPlaces = createSelector(propertyNearByPlaces, options => options);
const getAddMetas = createSelector(propertyAddMetas, options => options);
const getSearchMetas = createSelector(propertySearchMetas, options => options);
const getCategories = createSelector(propertyCategories, categories => categories);
const getPrices = createSelector(
  propertyPrices,
  selectedPropertyType,
  APP_SELECTORS.getSelectedCountry,
  (prices, type, country) => prices[type][country.abbr],
);

export const SELECTORS = {
  isFetching,
  isFavoritesFetching,
  isRelatedFetching,
  isMyPropertiesFetching,
  getProperties,
  getMyProperties,
  getFavorites,
  getRelatedProperties,
  getProperty,
  getMapView,
  getSaving,
  isShowingRelated,
  getAddListing,
  getEditListing,

  getSearchHistory,

  getPropertyTypes,
  getSelectedPropertyType,
  getFilters,
  getAmenities,
  getNearByPlaces,
  getGenders,
  getAddMetas,
  getSearchMetas,
  getSortOptions,
  getCategories,
  getPrices,
};
