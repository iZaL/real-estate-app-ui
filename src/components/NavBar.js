import React from 'react';
import {StyleSheet, View} from 'react-native';

const NavBar = ({style, left, right, middle}) => (
  <View style={[styles.navBar, style]}>
    <View style={styles.left}>
      {left}
    </View>
    <View style={styles.middle}>
      {middle}
    </View>
    <View style={styles.right}>
      {right}
    </View>
  </View>
);

NavBar.propTypes = {
  left: React.PropTypes.object,
  middle: React.PropTypes.object,
  right: React.PropTypes.object,
};

const styles = StyleSheet.create({
  navBar: {
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#EFEFF2',
    paddingTop: 20,
    flexDirection: 'row',
  },
  left: {
    minWidth: 60,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    minWidth: 60,
  },
});

export default NavBar;
