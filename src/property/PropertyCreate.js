/**
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {ACTIONS as APP_ACTIONS} from './../app/common/actions';
import {SELECTORS} from './common/selectors';
import {SELECTORS as APP_SELECTORS} from './../app/common/selectors';
import PropertyEditScene from './scenes/PropertyEditScene';

class PropertyCreate extends Component {

  static navigationOptions = ({navigation})=>({
    header: null,
  });

  updateStore = payload => {
    return this.props.actions.changeListingValue(payload);
  };

  saveProperty = () => {
    this.props.actions.saveProperty(this.props.listing.attributes);
  };

  render() {
    let {categories, listing} = this.props;

    let currentCategories = listing.attributes.type
      ? categories[listing.attributes.type]
      : [];

    return (
      <PropertyEditScene
        {...this.props}
        categories={currentCategories}
        listing={listing}
        updateStore={this.updateStore}
        saveProperty={this.saveProperty}
        navBarTitle="Add Your Property"
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS, ...APP_ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    listing: SELECTORS.getAddListing(state),
    categories: SELECTORS.getCategories(state),
    types: SELECTORS.getPropertyTypes(state),
    amenities: SELECTORS.getAmenities(state),
    nearByPlaces: SELECTORS.getNearByPlaces(state),
    country: APP_SELECTORS.getSelectedCountry(state),
    genders: SELECTORS.getGenders(state),
    saving: SELECTORS.getSaving(state),
    metas: SELECTORS.getAddMetas(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCreate);
