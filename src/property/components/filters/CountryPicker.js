/**
 * @flow
 */
import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryFlagIcon from './CountryFlagIcon';

export default class CountryPicker extends Component {
  static propTypes = {};

  _renderMenuOverlay = () => {
    let opacity = this.props.menuValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
    });

    return (
      <TouchableWithoutFeedback onPress={this._handleToggleMenu}>
        <Animated.View
          pointerEvents={this.props.menuIsVisible ? 'auto' : 'none'}
          style={[
            StyleSheet.absoluteFill,
            {backgroundColor: 'black', opacity: opacity},
          ]}
        />
      </TouchableWithoutFeedback>
    );
  };

  _renderMenu = () => {
    const {countries} = this.props;
    let translateY = this.props.menuValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-64, 0],
    });

    return (
      <Animated.View style={[styles.menu, {transform: [{translateY}]}]}>
        {countries.map(this._renderMenuOption)}
      </Animated.View>
    );
  };

  _renderMenuOption = country => {
    return (
      <TouchableWithoutFeedback
        fallback={TouchableHighlight}
        underlayColor="#ccc"
        key={country}
        onPress={() => this._handlePressUpdateLocation(country)}>
        <View style={styles.menuOption}>
          <Text>{country}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  _handlePressUpdateLocation = country => {
    this.props.changeCountry(country);
    this.props.toggleMenuVisible(false);
  };

  _handleToggleMenu = () => {
    let {menuIsVisible, toggleMenuVisible, menuValue} = this.props;
    let onCompleteAnimation = () => {};

    if (menuIsVisible) {
      onCompleteAnimation = ({finished}) => {
        toggleMenuVisible(false);
      };
    } else {
      toggleMenuVisible(true);
    }

    Animated.spring(menuValue, {
      toValue: menuIsVisible ? 0 : 1,
      overshootClamping: true,
    }).start(onCompleteAnimation);
  };

  render() {
    let {menuValue, country} = this.props;

    let arrowRotation = menuValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '-90deg'],
    });

    return (
      <View style={{padding: 10}}>

        <TouchableWithoutFeedback
          hitSlop={{left: 40, top: 30, right: 40, bottom: 10}}
          onPress={this._handleToggleMenu}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 5,
            }}>
            <CountryFlagIcon country={country} />
            <Text style={styles.navigationBarTitle}>
              {country.abbr}
            </Text>

            <View
              style={{
                marginLeft: 2,
                marginTop: 2,
              }}>
              <Ionicons name="ios-arrow-down" size={22} />
            </View>

          </View>
        </TouchableWithoutFeedback>
        <Modal
          style={styles.menuModal}
          visible={this.props.menuIsVisible}
          collapsible={false}>
          {this._renderMenuOverlay()}
          {this._renderMenu()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationBarContainer: {
    backgroundColor: '#fff',
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    position: 'absolute',
    overflow: 'hidden',
    paddingTop: 20,
    top: 0,
    left: 0,
    right: 0,
  },
  navigationBarTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBarTitle: {
    fontSize: 17,
    letterSpacing: -0.5,
    paddingLeft: 5,
  },
  navigationBarRightButton: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    top: 20,
    justifyContent: 'center',
  },
  menuModal: {},
  menu: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
  },
  menuOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
});
