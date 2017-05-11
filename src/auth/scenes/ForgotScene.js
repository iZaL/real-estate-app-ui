import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import colors from './../../common/colors';
import NavBar from './../../components/NavBar';
import NavButton from './../../components/NavButton';
import Separator from './../../components/Separator';

export default class ForgotScene extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
    onRightButtonPress: PropTypes.func.isRequired,
    onForgotPassword: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      email,
      onFieldChange,
      onForgotPassword,
      onRightButtonPress,
    } = this.props;

    return (
      <View style={{flex: 1}}>

        <NavBar
          right={
            <NavButton
              icon="ios-close"
              onPress={() => onRightButtonPress()}
              style={{paddingLeft: 20}}
            />
          }
        />

        <View style={styles.container}>

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={value => onFieldChange('email', value)}
            value={email}
            maxLength={40}
            placeholderTextColor="gray"
          />

          <Separator />

          <TouchableHighlight
            onPress={() => onForgotPassword()}
            style={[styles.button, {marginTop: 50}, !email && {opacity: 0.3}]}
            underlayColor="transparent">
            <Text style={styles.buttonText}>
              Recover Password
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
    color: colors.smokeGreyDark,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#CCCCCC',
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
