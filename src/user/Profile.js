import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {ACTIONS as PROPERTY_ACTIONS} from '../property/common/actions';
import {SELECTORS} from './common/selectors';
import {SELECTORS as PROPERTY_SELECTORS} from '../property/common/selectors';
import {SELECTORS as APP_SELECTORS} from '../app/common/selectors';
import ProfileScene from './scenes/ProfileScene';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  handleFavoritePress = (item: object) => {
    this.props.actions.favoriteProperty(item);
  };

  loadPropertyScene = (item: object) => {
    const {navigation} = this.props;
    // navigator.push(
    navigation.navigate('PropertyDetailScene', {
      property: item,
    });
  };

  fetchProperties = () => {
    this.props.actions.fetchMyProperties();
  };

  render() {
    const {properties, isFetching, country, user} = this.props;
    return (
      <ProfileScene
        user={user}
        properties={properties}
        isFetching={isFetching}
        country={country}
        loadScene={this.loadPropertyScene}
        fetchProperties={this.fetchProperties}
        handleFavoritePress={this.handleFavoritePress}
        refreshProperties={() => {}}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...ACTIONS, ...PROPERTY_ACTIONS}, dispatch),
  };
}

function mapStateToProps(state, props) {
  return {
    user: SELECTORS.getUser(state, props),
    properties: PROPERTY_SELECTORS.getMyProperties(state),
    isFetching: state.propertyReducer.isFetching,
    country: APP_SELECTORS.getSelectedCountry(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
