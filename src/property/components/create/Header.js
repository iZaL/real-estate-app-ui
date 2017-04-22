import React, {PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../common/colors';

export default class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const {title} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'green'
  },
  text: {
    color: colors.darkGrey,
    fontWeight: '600',
    fontSize: 20,
    padding: 30,
    textAlign: 'center',
  },
});
