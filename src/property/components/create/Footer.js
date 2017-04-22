import React, {PropTypes} from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import colors from '../../../common/colors';

export class Footer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    updateListing: PropTypes.func.isRequired,
  };

  render() {
    const {title, updateListing, disabled = false} = this.props;
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => updateListing()}
        style={[styles.container, disabled && {opacity: 0.5}]}
        disabled={disabled}>
        <Text style={styles.text}>
          {title ? title : 'Next'}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tomato,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default Footer;
