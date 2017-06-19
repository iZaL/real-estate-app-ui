import React, {Component, PropTypes} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import colors from '../../common/colors';

export default class SelectLanguageScene extends Component {
  static propTypes = {
    onLanguageSelect: PropTypes.func.isRequired,
  };

  render() {
    let {onLanguageSelect} = this.props;
    return (
      <View style={[styles.container]}>
        <StatusBar hidden={true} />

        <TouchableHighlight
          onPress={() => onLanguageSelect('en')}
          style={styles.selectLanguageWrapper}>
          <View style={styles.selectLanguageInner}>
            <Text style={styles.languageTitle}> English </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => onLanguageSelect('ar')}
          style={styles.selectLanguageWrapper}>
          <View style={styles.selectLanguageInner}>
            <Text style={styles.languageTitle}> العربي </Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectLanguageWrapper: {
    width: screenWidth / 2,
    height: screenWidth / 2,
    borderRadius: screenWidth / 4,
    backgroundColor: colors.smokeGrayLight,
    margin: 10,
  },
  selectLanguageInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageTitle: {
    color: 'black',
    fontWeight: '400',
    fontSize: 25,
    textAlign: 'center',
  },
});
