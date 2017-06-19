/**
 * @flow
 */
import React, {Component} from 'react';
import LocationSearchScene from './scenes/LocationSearchScene';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {SELECTORS} from './common/selectors';
import {SELECTORS as APP_SELECTORS} from './../app/common/selectors';

class PropertyLocationPicker extends Component {
  state = {};

  static navigationOptions = {
    header: null
  };

  loadPropertyScene = value => {
    if (!value.getAddressText()) {
      this.updateFilterProps('searchString', '');
    }

    this.props.actions.resetProperty();
    this.props.navigation.navigate('PropertyListScene');
  };

  goBack = () => {
    this.props.navigation.goBack(null);
  };

  onSearch = value => {
    this.updateFilterProps('searchString', value);
  };

  updateFilterProps = (field, value) => {
    let {propertyType} = this.props;
    return this.props.actions.updateFilter({
      propertyType: propertyType,
      field,
      value,
    });
  };

  render() {
    const {country, filters} = this.props;

    return (
      <LocationSearchScene
        searchString={filters.searchString}
        onSearch={this.onSearch}
        country={country}
        onLeftButtonPress={this.goBack}
        onRightButtonPress={this.loadPropertyScene}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    filters: SELECTORS.getFilters(state),
    country: APP_SELECTORS.getSelectedCountry(state),
    propertyType: SELECTORS.getSelectedPropertyType(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PropertyLocationPicker,
);
