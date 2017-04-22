/*
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import colors from '../../../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class EditProfile extends Component {
  static propTypes = {
    loadScene: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.null]).isRequired,
  };

  render() {
    const {loadScene, user} = this.props;
    return (
      <TouchableHighlight onPress={() => loadScene('user')} underlayColor="transparent">
        <View style={styles.container}>
          <View style={styles.leftCol}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.hint}>View and edit profile</Text>
          </View>

          <View style={styles.rightCol}>
            {user.image
              ? <Image source={{uri: user.image}} style={styles.logo} resizeMode="cover" />
              : <FontAwesome name="user-circle-o" color={colors.smokeGreyDark} size={80} />}

          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 50,
  },
  leftCol: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    color: colors.smokeGreyDark,
    fontWeight: '700',
    paddingVertical: 5,
  },
  hint: {
    color: colors.grey,
    fontWeight: '100',
    paddingBottom: 5,
  },
  icon: {
    fontWeight: '100',
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});
