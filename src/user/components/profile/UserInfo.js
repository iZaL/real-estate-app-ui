/**
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../../common/colors';
import Separator from './../../../components/Separator';

export default class UserInfo extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.rowContainer}>

          <Text style={styles.description}>
            {user.company.description}
          </Text>
          <Separator style={{marginVertical: 20}} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  description: {
    fontWeight: '100',
    color: colors.darkGrey,
    fontSize: 15,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '100',
    color: colors.darkGrey,
  },
  label: {
    paddingBottom: 5,
    color: colors.smokeGreyLight,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
