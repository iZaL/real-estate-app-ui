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

export default class RegisterScene extends Component {
  static propTypes = {
    handleRegister: PropTypes.func.isRequired,
    handleLoginRoute: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
  };

  render() {
    const {
      name,
      email,
      mobile,
      password,
      password_confirmation,
      onFieldChange,
      handleLoginRoute,
      handleRegister,
      busy,
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

          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={value => onFieldChange('name', value)}
            value={name}
            maxLength={40}
            placeholderTextColor="gray"
          />
          <Separator />

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={value => onFieldChange('email', value)}
            value={email}
            maxLength={40}
            placeholderTextColor="gray"
          />
          <Separator />

          <Text style={styles.label}>MOBILE</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={value => onFieldChange('mobile', value)}
            value={mobile}
            maxLength={40}
            placeholderTextColor="gray"
          />
          <Separator />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={value => onFieldChange('password', value)}
            value={password}
            maxLength={40}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />

          <Separator />

          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={value =>
              onFieldChange('password_confirmation', value)}
            value={password_confirmation}
            maxLength={40}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
          <Separator />

          <TouchableHighlight
            onPress={() => handleRegister()}
            title="Login"
            style={[styles.button, {marginTop: 50}]}
            underlayColor="transparent">
            <Text style={styles.buttonText}>
              {busy ? 'signing up' : 'Register'}
            </Text>
          </TouchableHighlight>

          <Text
            style={[
              styles.textCenter,
              {paddingTop: 30, paddingBottom: 30, color: 'white'},
            ]}>
            or
          </Text>

          <TouchableHighlight
            onPress={() => handleLoginRoute()}
            underlayColor="transparent"
            style={[styles.button, styles.center, {opacity: 0.5}]}>
            <Text
              style={[styles.buttonText, styles.textCenter, {color: 'black'}]}>
              Login
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
