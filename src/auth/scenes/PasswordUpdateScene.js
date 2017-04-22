import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import colors from './../../common/colors';
import NavBar from './../../components/NavBar';
import NavButton from './../../components/NavButton';
import Separator from './../../components/Separator';

export default class PasswordUpdateScene extends Component {
  static propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    onUpdatePassword: PropTypes.func.isRequired,
    onRightButtonPress: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    confirmedPassword: PropTypes.string.isRequired,
  };

  render() {
    const {onFieldChange, password, confirmedPassword, onUpdatePassword, onRightButtonPress} = this.props;

    return (
      <View style={{flex: 1}}>
        <NavBar right={<NavButton icon="ios-close" onPress={() => onRightButtonPress()} style={{paddingLeft: 20}} />} />

        <View style={styles.container}>

          <Text style={styles.label}>NEW PASSWORD</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={value => onFieldChange('password', value)}
            value={password}
            maxLength={40}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
          <Separator />

          <Text style={styles.label}>CONFIRM NEW PASSWORD</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={value => onFieldChange('password_confirmation', value)}
            value={confirmedPassword}
            maxLength={40}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
          <Separator />

          <TouchableHighlight
            onPress={() => onUpdatePassword()}
            underlayColor="transparent"
            style={[styles.button, styles.center, {marginTop: 50}, (!password || !confirmedPassword) && {opacity: 0.3}]}
            disabled={!password || !confirmedPassword}>
            <Text style={[styles.buttonText, styles.textCenter, {color: 'black'}]}>
              UPDATE PASSWORD
            </Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
    padding: 20,
  },
  label: {
    fontSize: 12,
    color: colors.smokeGreyDark,
    marginTop: 15,
    marginBottom: 2,
    fontWeight: '100',
  },
  textCenter: {
    alignSelf: 'center',
  },
  mTop20: {
    marginTop: 20,
  },
  textInput: {
    height: 25,
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    fontSize: 14,
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
    color: 'white',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#CCCCCC',
    opacity: 0.7,
    borderRadius: 30,
    padding: 10,
    height: 40,
    width: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});
