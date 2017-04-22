/**
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import colors from '../../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class UserDetailScene extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const {user, loadScene} = this.props;

    return (
      <View style={styles.container}>
        {user.image
          ? <Image source={{uri: user.image}} style={styles.logo} resizeMode="cover" />
          : <FontAwesome name="picture-o" color="white" size={200} style={styles.emptyImageIcon} />}

        <View style={styles.editIconWrapper}>
          <TouchableHighlight onPress={loadScene} underlayColor="transparent">
            <FontAwesome name="pencil" color={colors.darkGrey} size={18} style={styles.editIcon} />
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.date}>Member Since May 2015</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.darkGrey,
  },
  date: {
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '100',
    color: colors.smokeGreyDark,
  },
  logo: {
    height: 200,
    width: Dimensions.get('window').width,
  },
  emptyImageIcon: {
    height: 200,
    backgroundColor: colors.smokeGreyLight,
    textAlign: 'center',
  },
  editIconWrapper: {
    position: 'absolute',
    top: 200,
    right: 15,
    marginTop: -20,
    height: 40,
    width: 40,
    borderRadius: 20,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.smokeGreyDark,
    shadowOpacity: 0.6,
    shadowOffset: {width: 1, height: 1},
  },
});
