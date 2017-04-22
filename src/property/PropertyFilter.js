/**
 * @flow
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import PropertyFilterScene from './scenes/PropertyFilterScene';
import LocationSearchScene from './scenes/LocationSearchScene';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {ACTIONS as APP_ACTIONS} from './../app/common/actions';
import {SELECTORS} from './common/selectors';
import {SELECTORS as APP_SELECTORS} from './../app/common/selectors';

class PropertyFilter extends Component {
  state = {
    searchMode: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleButtonPress: this.loadPropertyScene,
    });
  }

  loadPropertyScene = () => {
    this.props.navigation.goBack();
  };

  updateFilterProps = (field, value) => {
    let {propertyType} = this.props;
    return this.props.actions.updateFilter({
      propertyType: propertyType,
      field,
      value,
    });
  };

  onCategorySelect = value => {
    this.updateFilterProps('category', value);
  };

  onPriceFromSelect = value => {
    this.updateFilterProps('priceFrom', value);
  };

  onPriceToSelect = value => {
    this.updateFilterProps('priceTo', value);
  };

  onSortSelect = value => {
    this.updateFilterProps('sortBy', value);
  };

  onMetaSelect = (field, value) => {
    this.updateFilterProps(field, value);
  };

  onSearch = value => {
    this.updateFilterProps('searchString', value);
  };

  showSearch = () => {
    return this.setState({
      searchMode: true,
    });
  };

  hideSearch = value => {
    if (!value.getAddressText()) {
      this.updateFilterProps('searchString', '');
    }
    this.setState({
      searchMode: false,
    });
  };

  search = () => {
    this.props.navigation.goBack();
    this.props.actions.resetProperty();
    this.props.actions.fetchProperties();
  };

  changeMapView = () => {
    this.props.actions.changeMapView();
  };

  goBack = () => {
    this.props.navigation.goBack(null);
  };

  changeCountry = country => {
    this.props.actions.changeCountry(country);
  };

  changeType = type => {
    this.props.actions.changePropertyType(type);
  };

  render() {
    const {
      categories,
      filters,
      country,
      countries,
      propertyType,
      mapView,
      prices,
      searchMetas,
      sortOptions,
    } = this.props;
    const {searchMode} = this.state;

    let currentCategories = categories[propertyType];
    let categoriesWithAny = currentCategories.concat('Any').reverse();

    return (
      <View style={{flex: 1}}>
        {searchMode
          ? <LocationSearchScene
              searchString={this.props.filters.searchString}
              onSearch={this.onSearch}
              country={country}
              onLeftButtonPress={this.goBack}
              onRightButtonPress={this.hideSearch}
            />
          : <PropertyFilterScene
              onMapViewChange={this.changeMapView}
              onSearch={this.onSearch}
              onPriceFromSelect={this.onPriceFromSelect}
              onPriceToSelect={this.onPriceToSelect}
              onMetaSelect={this.onMetaSelect}
              onSearchPress={this.search}
              onCategorySelect={this.onCategorySelect}
              onSortSelect={this.onSortSelect}
              onShowSearch={this.showSearch}
              onNavigateBack={this.goBack}
              onCountryChange={this.changeCountry}
              onTypeChange={this.changeType}
              propertyType={propertyType}
              categories={categoriesWithAny}
              country={country}
              countries={countries}
              filters={filters}
              mapView={mapView}
              prices={prices}
              searchMetas={searchMetas}
              sortOptions={sortOptions}
            />}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS, ...APP_ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    categories: SELECTORS.getCategories(state),
    prices: SELECTORS.getPrices(state),
    filters: SELECTORS.getFilters(state),
    country: APP_SELECTORS.getSelectedCountry(state),
    countries: APP_SELECTORS.getCountries(state),
    mapView: SELECTORS.getMapView(state),
    propertyType: SELECTORS.getSelectedPropertyType(state),
    sortOptions: SELECTORS.getSortOptions(state),
    searchMetas: SELECTORS.getSearchMetas(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyFilter);
