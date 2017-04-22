/*
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ACTIONS} from './common/actions';
import RegisterScene from './scenes/RegisterScene';
import {NavigationActions} from 'react-navigation';

type State = {
  name: string,
  email: string,
  password: string,
  mobile: string,
};

class Register extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state: State = {
    name: 'ZaL',
    email: 'z4ls@live.com',
    mobile: '97978803',
    password: 'password',
    password_confirmation: 'password',
  };

  handleLoginRoute = () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
  };

  handleRegister = () => {
    let credentials = {...this.state};
    this.props.actions.register(credentials);
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  goBack = () => {
    const navigationAction = NavigationActions.navigate({
      routeName: 'Tabs',
      params: {},
      action: NavigationActions.navigate({routeName: 'SettingsTab'}),
    });
    this.props.navigation.dispatch(navigationAction);
  };

  render() {
    const {auth} = this.props;
    return (
      <RegisterScene
        {...this.state}
        handleLoginRoute={this.handleLoginRoute}
        handleRegister={this.handleRegister}
        onFieldChange={this.onFieldChange}
        busy={auth.register.busy}
        onRightButtonPress={this.goBack}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(ACTIONS, dispatch)};
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
