/**
 * @flow
 */
import React, {PropTypes, PureComponent} from 'react';
import {Image, StyleSheet, View, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {SELECTORS} from './common/selectors';
import {SELECTORS as APP_SELECTORS} from './../app/common/selectors';
import PropertyManagerScene from './scenes/PropertyManagerScene';

class PropertyList extends PureComponent {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchMyProperties();
  }

  loadScene = (property: object) => {
    this.props.navigation.navigate('PropertyDetailScene', {
      property: property,
    });
  };

  fetchProperties = () => {
    this.props.actions.fetchMyProperties();
  };

  handleFavoritePress = (property: object) => {
    this.props.actions.favoriteProperty(property);
  };

  editProperty = item => {
    this.props.actions.editProperty(item);
    this.props.navigation.navigate('PropertyEditScene');
  };

  deleteProperty = item => {
    return Alert.alert('Delete Property', 'Are you sure ?', [
      {text: 'Cancel'},
      {
        text: 'Yes',
        onPress: () => {
          this.props.actions.deleteProperty(item);
        },
      },
    ]);
  };

  render() {
    const {properties, isFetching, country} = this.props;
    let emptyIcon = require('./../../assets/empty.png');

    if (!isFetching && properties.length === 0) {
      return (
        <View
          style={[
            styles.container,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Image
            source={emptyIcon}
            style={{width: 200, height: 200}}
            resizeMode="contain"
          />
        </View>
      );
    }

    return (
      <PropertyManagerScene
        collection={properties}
        loadScene={this.loadScene}
        handleFavoritePress={this.handleFavoritePress}
        isFetching={isFetching}
        fetchProperties={this.fetchProperties}
        country={country}
        editProperty={this.editProperty}
        deleteProperty={this.deleteProperty}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    properties: SELECTORS.getMyProperties(state),
    isFetching: SELECTORS.isMyPropertiesFetching(state),
    mapView: SELECTORS.getMapView(state),
    country: APP_SELECTORS.getSelectedCountry(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
