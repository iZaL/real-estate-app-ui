import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import UserInfo from '../components/profile/UserInfo';
import UserLogo from '../components/profile/UserLogo';
import Contact from '../components/profile/Contact';
import PropertyListScene from '../../property/scenes/PropertyListScene';
import {TabBar, TabViewAnimated} from 'react-native-tab-view';
import colors from '../../common/colors';
import {CountryPropType} from '../../property/common/proptypes';

export default class ProfileScene extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    properties: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    loadScene: PropTypes.func.isRequired,
    handleFavoritePress: PropTypes.func.isRequired,
    fetchProperties: PropTypes.func.isRequired,
    country: CountryPropType.isRequired,
  };

  state = {
    index: 0,
    routes: [
      {key: '1', title: 'Basic Info'},
      {key: '2', title: 'Properties'},
      {key: '3', title: 'Contact'},
    ],
  };

  handleChangeTab = index => {
    this.setState({index});
  };

  renderHeader = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        labelStyle={styles.label}
      />
    );
  };

  renderScene = ({route}) => {
    const {
      user,
      properties,
      isFetching,
      loadScene,
      handleFavoritePress,
      fetchProperties,
      country,
      refreshProperties,
    } = this.props;
    switch (route.key) {
      case '1':
        return <UserInfo user={user} />;
      case '2':
        return (
          <PropertyListScene
            collection={properties}
            loadScene={loadScene}
            handleFavoritePress={handleFavoritePress}
            isFetching={isFetching}
            fetchProperties={fetchProperties}
            country={country}
            refreshProperties={refreshProperties}
          />
        );
      case '3':
        return <Contact user={user} />;
      default:
        return null;
    }
  };

  render() {
    const {user} = this.props;
    return (
      <View style={{flex: 1}}>
        <UserLogo user={user} />
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.handleChangeTab}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: 'white',
  },
  indicator: {
    height: 2,
    backgroundColor: colors.accent,
  },
  label: {
    color: colors.smokeGreyDark,
    fontWeight: '400',
  },
});
