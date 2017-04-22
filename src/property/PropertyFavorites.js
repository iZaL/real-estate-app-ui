/**
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {SELECTORS} from './common/selectors';
import PropertyListScene from './scenes/PropertyListScene';
import {SELECTORS as APP_SELECTORS} from './../app/common/selectors';

class PropertyFavorites extends Component {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    lastImagePress: 0,
  };

  componentDidMount() {
    this.props.actions.fetchFavorites();
  }

  loadScene = (property: object) => {
    const {navigation} = this.props;
    navigation.navigate('PropertyDetailScene', {
      property: property,
    });
  };

  fetchProperties = () => {
    this.props.actions.fetchFavorites();
  };

  handleFavoritePress = (property: object) => {
    this.props.actions.favoriteProperty(property);
  };

  render() {
    const {properties, isFetching, country} = this.props;
    return (
      <View style={styles.container}>

        {properties.length > 0
          ? <PropertyListScene
              collection={properties}
              loadScene={this.loadScene}
              handleFavoritePress={this.handleFavoritePress}
              isFetching={isFetching}
              fetchProperties={this.fetchProperties}
              country={country}
              refreshProperties={() => {}}
            />
          : <View
              style={{
                padding: 10,
                backgroundColor: 'white',
                alignItems: 'center',
              }}>
              <Text>No Favorites</Text>
            </View>}

      </View>
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
    properties: SELECTORS.getFavorites(state),
    isFetching: SELECTORS.isFavoritesFetching(state),
    country: APP_SELECTORS.getSelectedCountry(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyFavorites);
