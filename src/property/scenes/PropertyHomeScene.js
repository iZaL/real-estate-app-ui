/**
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import colors from '../../common/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import isEmpty from 'lodash/isEmpty';
import CountryPicker from '../components/filters/CountryPicker';
import HistoryList from './../scenes/HistoryList';
import CountryBackgrounds from './../../common/countryBackground';

export default class PropertyHomeScene extends Component {
  static propTypes = {
    openSearchScene: PropTypes.func.isRequired,
    changeActiveTab: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    removeFilter: PropTypes.func.isRequired,
    loadPropertyScene: PropTypes.func.isRequired,
  };

  state = {
    scrollY: new Animated.Value(0),
    menuValue: new Animated.Value(0),
    menuIsVisible: false,
  };
  toggleMenuVisible = value => {
    this.setState({
      menuIsVisible: value,
    });
  };

  changeTab = name => {
    this.props.changeActiveTab(name);
  };

  openSearchScene = () => {
    this.props.openSearchScene();
  };

  renderHeader = () => {
    let {country} = this.props;
    let {scrollY} = this.state;

    let logoScale = scrollY.interpolate({
      inputRange: [-50, 0, 50],
      outputRange: [1.5, 1, 1],
    });

    let logoTranslateY = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [0, 0, 0],
    });

    let countryImage = CountryBackgrounds[country.abbr];
    return (
      <View style={styles.hero}>
        <Animated.Image
          source={countryImage}
          style={[
            styles.countryImage,
            {
              transform: [{scale: logoScale}, {translateY: logoTranslateY}],
            },
          ]}
          resizeMode="stretch"
        />
      </View>
    );
  };

  renderTabs() {
    let {activeTab} = this.props;
    let {scrollY} = this.state;

    let logoTranslateY = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [40, 0, -40],
    });

    let {filters} = this.props;

    return (
      <Animated.View
        style={[
          styles.searchBar,
          {
            transform: [{translateY: logoTranslateY}],
          },
        ]}>
        <View style={styles.searchTabs}>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.changeTab('For Sale')}
            style={[styles.tab, activeTab === 'For Sale' && styles.tabActive]}>
            <Text
              style={[
                styles.tabTitle,
                activeTab === 'For Sale' && styles.tabTitleActive,
              ]}>
              BUY
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.changeTab('For Rent')}
            style={[styles.tab, activeTab === 'For Rent' && styles.tabActive]}>
            <Text
              style={[
                styles.tabTitle,
                activeTab === 'For Rent' && styles.tabTitleActive,
              ]}>
              RENT
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.changeTab('For Share')}
            style={[styles.tab, activeTab === 'For Share' && styles.tabActive]}>
            <Text
              style={[
                styles.tabTitle,
                activeTab === 'For Share' && styles.tabTitleActive,
              ]}>
              SHARE
            </Text>
          </TouchableHighlight>

        </View>

        <TouchableHighlight
          style={styles.searchInput}
          onPress={() => this.openSearchScene()}
          underlayColor={colors.smokeGreyLight}
          activeOpacity={0.5}>

          <View style={styles.textInput}>
            <Ionicons
              name="ios-search"
              size={25}
              color={colors.smokeGreyLight}
              style={[styles.searchIcon, {height: 25}]}
            />
            <Text style={styles.searchText}>
              {filters && filters.searchString
                ? filters.searchString
                : 'Search'}
            </Text>
            <Text>
              {filters &&
                filters.searchString &&
                <Ionicons
                  name="ios-close-outline"
                  size={30}
                  color={colors.smokeGreyDark}
                  style={[styles.searchIcon, {height: 30}]}
                />}
            </Text>
          </View>
        </TouchableHighlight>

      </Animated.View>
    );
  }

  render() {
    let {scrollY} = this.state;
    let {
      searchHistory,
      setFilter,
      countries,
      country,
      onCountryChange,
      removeFilter,
      loadPropertyScene,
    } = this.props;
    let emptyIcon = require('./../../../assets/logo.png');

    return (
      <View style={styles.container}>

        {this.renderHeader()}
        {this.renderTabs()}

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          style={StyleSheet.absoluteFill}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
            },
          )}>
          <View style={styles.heroSpacer} />
          <View style={styles.contentContainerStyle}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.historyTitle]}>
                Search History
              </Text>
              <CountryPicker
                {...this.state}
                toggleMenuVisible={this.toggleMenuVisible}
                countries={countries}
                country={country}
                changeCountry={onCountryChange}
              />
            </View>
            <View style={styles.historyContainer}>

              {isEmpty(searchHistory)
                ? <TouchableHighlight
                    onPress={() => {}}
                    underlayColor="transparent">
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        marginVertical: 30,
                      }}>
                      <Image
                        source={emptyIcon}
                        style={{width: 150, height: 150}}
                      />
                      <Text
                        style={{
                          color: colors.smokeGreyLight,
                          fontSize: 20,
                        }}
                      />
                    </View>
                  </TouchableHighlight>
                : <HistoryList
                    collection={searchHistory}
                    setFilter={setFilter}
                    removeFilter={removeFilter}
                  />}
            </View>
          </View>
        </Animated.ScrollView>

      </View>
    );
  }
}

const HeroHeight = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  countryImage: {
    flex: 1,
    width: null,
    height: null,
  },
  contentContainerStyle: {
    padding: 10,
    backgroundColor: 'white',
    // minHeight: Dimensions.get("window").height - HeroHeight
  },
  searchBar: {
    position: 'absolute',
    top: 120,
    backgroundColor: 'white',
    marginHorizontal: 10,
    opacity: 0.9,
    zIndex: 1000,
  },
  searchTabs: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    padding: 10,
  },
  tabActive: {
    borderBottomColor: colors.accent,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchIcon: {
    // paddingHorizontal: 10,
  },
  tabTitle: {
    fontSize: 17,
    color: colors.darkGrey,
    fontWeight: '300',
  },
  tabTitleActive: {
    color: colors.accent,
  },
  searchText: {
    flex: 1,
    color: colors.smokeGreyDark,
    paddingLeft: 10,
    fontSize: 17,
  },
  searchHistory: {
    flex: 1,
    padding: 10,
  },
  historyTitle: {
    color: colors.darkGrey,
    fontWeight: '500',
    fontSize: 18,
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HeroHeight,
  },
  heroSpacer: {
    height: HeroHeight,
    backgroundColor: 'transparent',
  },
  historyContent: {
    flex: 1,
    paddingTop: 5,
  },
  title: {
    color: colors.smokeGreyDark,
    fontWeight: '100',
    fontSize: 15,
  },
  historyContainer: {
    flex: 1,
    paddingTop: 10,
  },
});
