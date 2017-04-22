/**
 * @flow
 */
import React, {Component, PureComponent, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {ACTIONS as APP_ACTIONS} from './../app/common/actions';
import {SELECTORS} from './common/selectors';
import {SELECTORS as APP_SELECTORS} from './../app/common/selectors';
import PropertyHomeScene from './scenes/PropertyHomeScene';

class PropertyHome extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    header: () => ({
      visible: false,
    }),
  };

  changePropertyType = value => {
    this.props.actions.changePropertyType(value);
  };

  openSearchScene = () => {
    // this.props.actions.resetProperty();
    this.props.navigation.navigate('LocationSearch');
  };

  changeCountry = country => {
    this.props.actions.changeCountry(country);
  };

  removeFromHistory = (propertyType, filters) => {
    let payload = {
      [propertyType]: filters,
    };
    this.props.actions.removeFromHistory(payload);
  };

  setFilter = (propertyType, filters) => {
    const {actions, navigation} = this.props;

    actions.setFilters({
      propertyType: propertyType,
      filters: filters,
    });

    if (filters.country && filters.country !== this.props.country.fullName) {
      this.props.actions.changeCountry(filters.country);
    }
    navigation.navigate('PropertyListScene');
  };

  loadPropertyScene = () => {
    this.props.navigation.navigate('PropertyListScene');
  };

  render() {
    let {searchHistory, propertyType, filters, countries, country} = this.props;
    return (
      <PropertyHomeScene
        changeActiveTab={this.changePropertyType}
        openSearchScene={this.openSearchScene}
        searchHistory={searchHistory}
        setFilter={this.setFilter}
        activeTab={propertyType}
        filters={filters}
        onCountryChange={this.changeCountry}
        countries={countries}
        country={country}
        removeFilter={this.removeFromHistory}
        loadPropertyScene={this.loadPropertyScene}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS, ...APP_ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    properties: SELECTORS.getProperties(state),
    isFetching: SELECTORS.isFetching(state),
    searchHistory: SELECTORS.getSearchHistory(state),
    propertyType: SELECTORS.getSelectedPropertyType(state),
    filters: SELECTORS.getFilters(state),
    country: APP_SELECTORS.getSelectedCountry(state),
    countries: APP_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyHome);
