/**@flow*/

import React, {Component, PropTypes} from 'react';
import {ActionSheetIOS, Animated, Linking} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {SELECTORS} from './common/selectors';
import {SELECTORS as APP_SELECTORS} from './../app/common/selectors';
import PropertyDetailScene from './scenes/PropertyDetailScene';

class PropertyDetail extends Component {
  static propTypes = {
    property: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      visible: navigation.state.params.visibility,
    }),
  };

  state = {
    sceneType: 'detailScene',
  };

  constructor() {
    super();
    this._animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      visibility: true,
    });
    this.props.actions.incrementViews(this.props.property._id);
  }

  handleFavoritePress = (property: object) => {
    this.props.actions.favoriteProperty(property);
  };

  loadProfile = (user: object) => {
    const {navigation} = this.props;
    navigation.navigate('ProfileScene', {
      user: user,
    });
  };

  onPinPress = () => {
    return this.followLocation();
  };

  setSceneType = type => {
    if (type === 'detailScene') {
      this.props.navigation.setParams({
        visibility: true,
      });
    } else {
      this.props.navigation.setParams({
        visibility: false,
      });
    }

    this.setState({
      sceneType: type,
    });
  };

  followLocation = () => {
    const {property} = this.props;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: `${property.title}`,
        options: ['Open in Apple Maps', 'Open in Google Maps', 'Cancel'],
        destructiveButtonIndex: -1,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        this.openMaps(property, buttonIndex);
      },
    );
  };

  openMaps(property, buttonIndex) {
    let address = encodeURIComponent(
      `${property.address.city},${property.address.state},${property.address.country}`,
    );
    switch (buttonIndex) {
      case 0:
        Linking.openURL(
          `http://maps.apple.com/?dll=${property.address.latitude},${property.address.longitude}`,
        );
        break;
      case 1:
        const nativeGoogleUrl = `comgooglemaps://?daddr=${property.address.latitude},${property.address.longitude}&center=${property.address.latitude},${property.address.longitude}&zoom=14&views=traffic&directionsmode=driving`;
        Linking.canOpenURL(nativeGoogleUrl).then(supported => {
          const url = supported
            ? nativeGoogleUrl
            : `http://maps.google.com/?q=loc:${property.address.latitude}+${property.address.longitude}`;
          Linking.openURL(url);
        });
        break;
    }
  }

  render() {
    const {property, country} = this.props;
    let {sceneType} = this.state;
    return (
      <PropertyDetailScene
        property={property}
        sceneType={sceneType}
        handleFavoritePress={this.handleFavoritePress}
        loadProfile={this.loadProfile}
        onPinPress={this.onPinPress}
        setSceneType={this.setSceneType}
        country={country}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS}, dispatch)};
}

function mapStateToProps(state, props) {
  return {
    property: SELECTORS.getProperty(state, props),
    country: APP_SELECTORS.getSelectedCountry(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetail);
