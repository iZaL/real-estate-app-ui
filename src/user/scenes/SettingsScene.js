/**
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SettingListItem from '../components/SettingListItem';
import EditProfile from '../components/profile/EditProfile';
import Separator from '../../components/Separator';
import {CountryPropType} from '../../property/common/proptypes';

export default class SettingsScene extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.null]).isRequired,
    country: CountryPropType.isRequired,
    loadScene: PropTypes.func.isRequired,
  };

  render() {
    const {isAuthenticated, user, country, loadScene} = this.props;
    return (
      <ScrollView style={styles.container}>

        {isAuthenticated && <EditProfile loadScene={loadScene} user={user} />}

        <SettingListItem
          title="Upload Property"
          route="propertyCreate"
          loadScene={loadScene}
          icon="plus-square-o"
        />

        <Separator />

        <SettingListItem
          title="Change Country"
          route="countrySelect"
          loadScene={loadScene}
          icon="globe"
          selected={country.fullName}
        />

        <Separator />

        {isAuthenticated
          ? <View>
              <SettingListItem
                title="My Properties"
                route="manageProperties"
                loadScene={loadScene}
                icon="key"
              />
              <Separator />
              <SettingListItem
                title="Logout"
                route="logout"
                loadScene={loadScene}
                icon="key"
              />
            </View>
          : <SettingListItem
              title="Login"
              route="login"
              loadScene={loadScene}
              icon="key"
            />}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
