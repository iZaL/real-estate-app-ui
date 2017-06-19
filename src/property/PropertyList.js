/**
 * @flow
 */
import React, {PropTypes, PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {SELECTORS} from './common/selectors';
import {SELECTORS as APP_SELECTORS} from './../app/common/selectors';
import PropertyListScene from './scenes/PropertyListScene';
import PropertyMapScene from './scenes/PropertyMapScene';
import NavButton from '../components/NavButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from './../common/colors';
import PropertyRelatedList from './components/PropertyRelatedList';
import EmptyResult from './components/EmptyResult';
import isEmpty from 'lodash/isEmpty';
import ResultHint from './components/ResultHint';

class PropertyList extends PureComponent {
  static propTypes = {
    properties: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };


  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <NavButton
          icon="ios-arrow-back"
          style={{width: 33, height: 33, marginLeft: -5}}
          iconSize={33}
          onPress={() => navigation.state.params && navigation.state.params.handleLeftButtonPress()}
        />
      ),
      headerRight: (
        <NavButton
          icon={<FontAwesome name="sliders" size={25} color={colors.accent} />}
          onPress={() => navigation.state.params && navigation.state.params.handleRightButtonPress()}
        />
      )
    }
  };

  componentDidMount() {
    this.props.actions.fetchProperties();

    this.props.navigation.setParams({
      handleLeftButtonPress: this.loadHomeScene,
      handleRightButtonPress: this.loadFilterScene,
    });
  }

  loadHomeScene = () => {
    this.props.navigation.navigate('PropertyHomeScene');
  };

  loadFilterScene = () => {
    this.props.navigation.navigate('PropertyFilter');
  };

  loadScene = (property: object) => {
    this.props.navigation.navigate('PropertyDetailScene', {
      property: property,
    });
  };

  fetchProperties = () => {
    this.props.actions.fetchProperties();
  };

  handleFavoritePress = (property: object) => {
    this.props.actions.favoriteProperty(property);
  };

  refreshProperties = () => {
    this.props.actions.resetPropertyNextPageURL();
    this.props.actions.fetchProperties();
  };

  render() {
    const {
      properties,
      isFetching,
      isRelatedFetching,
      mapView,
      country,
      filters,
      searchType,
      showRelated,
      relatedProperties,
      countries,
    } = this.props;
    const {searchString} = filters;

    let renderingComponent;

    if (mapView) {
      renderingComponent = (
        <View style={styles.container}>
          {!isFetching &&
            <ResultHint
              country={country}
              searchType={searchType}
              searchLocation={searchString}
            />}
          <PropertyMapScene
            collection={properties.length ? properties : relatedProperties}
            loadScene={this.loadScene}
            handleFavoritePress={this.handleFavoritePress}
            isFetching={isFetching}
            fetchProperties={this.fetchProperties}
            followLocation={() => {}}
            country={country}
          />
        </View>
      );
    } else {
      if (showRelated) {
        renderingComponent = (
          <View style={styles.container}>

            {!isRelatedFetching &&
              <EmptyResult
                country={country}
                searchType={searchType}
                searchLocation={searchString}
              />}

            {relatedProperties.length > 0 &&
              <PropertyRelatedList
                loadScene={this.loadScene}
                handleFavoritePress={this.handleFavoritePress}
                isFetching={isRelatedFetching}
                fetchProperties={this.fetchProperties}
                collection={relatedProperties}
                title="Showing Related Properties"
                country={country}
                searchType={searchType}
                searchLocation={searchString}
              />}
          </View>
        );
      } else {
        renderingComponent = (
          <View style={styles.container}>
            <ResultHint
              country={country}
              searchType={searchType}
              searchLocation={searchString}
              isFetching={isFetching}
            />
            <PropertyListScene
              collection={properties}
              loadScene={this.loadScene}
              handleFavoritePress={this.handleFavoritePress}
              isFetching={isFetching}
              fetchProperties={this.fetchProperties}
              country={country}
              countries={countries}
              refreshProperties={this.refreshProperties}
            />
          </View>
        );
      }
    }

    return renderingComponent;
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
    properties: SELECTORS.getProperties(state),
    relatedProperties: SELECTORS.getRelatedProperties(state),
    isFetching: SELECTORS.isFetching(state),
    isRelatedFetching: SELECTORS.isRelatedFetching(state),
    mapView: SELECTORS.getMapView(state),
    country: APP_SELECTORS.getSelectedCountry(state),
    searchType: SELECTORS.getSelectedPropertyType(state),
    filters: SELECTORS.getFilters(state),
    showRelated: SELECTORS.isShowingRelated(state),
    countries: APP_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
