import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS as APP_ACTIONS} from './../app/common/actions';
import {SELECTORS as APP_SELECTORS} from './../app/common/selectors';
import CountryListScene from './scenes/CountryListScene';

class CountryList extends Component {
  onCountrySelect = country => {
    this.props.actions.changeCountry(country);
    this.props.navigation.goBack();
  };

  render() {
    const {countries, country} = this.props;
    return (
      <CountryListScene
        countries={countries}
        onCountrySelect={this.onCountrySelect}
        country={country}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...APP_ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    country: APP_SELECTORS.getSelectedCountry(state),
    countries: APP_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);
