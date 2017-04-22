import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import colors from '../../../common/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import isNull from 'lodash/isNull';

export default class NavBack extends Component {
  static propTypes = {
    stage: PropTypes.number.isRequired,
    icon: PropTypes.string,
    text: PropTypes.string,
  };

  goBack() {
    this.props.onPress();
  }

  render() {
    const {style, text, icon, stage} = this.props;
    return (
      <View style={{flex: 1}}>
        {!isNull(stage) &&
          stage > 1 &&
          <TouchableHighlight
            style={styles.container}
            onPress={() => {
              this.goBack();
            }}
            underlayColor="transparent">
            {icon
              ? <Ionicons name={icon} size={33} color={colors.accent} style={[styles.icon]} />
              : <Text style={[styles.title, style]}>{text}</Text>}
          </TouchableHighlight>}
      </View>
    );
  }
}

NavBack.propTypes = {
  text: React.PropTypes.string,
  icon: React.PropTypes.string,
  stage: React.PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 10,
  },
  title: {
    color: colors.accent,
    fontSize: 15,
  },
  icon: {
    width: 13,
    height: 33,
    alignSelf: 'center',
  },
});
