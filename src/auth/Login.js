import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import * as NavigationService from './../components/NavigationService';
import LoginScene from './scenes/LoginScene';
import {NavigationActions} from 'react-navigation';

class Login extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  state = {
    email: 'admin@test.com',
    password: 'password',
  };

  handleLogin = () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.actions.login(credentials, this.props.navigation);
  };

  handleRegisterRoute = () => {
    this.props.navigation.navigate('Register');
  };

  handleForgotPasswordRoute = () => {
    this.props.navigation.navigate('Forgot');
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  goBack = () => {
    const navigationAction = NavigationActions.back(null);
    this.props.navigation.dispatch(navigationAction);
  };

  render() {
    const {auth} = this.props;
    return (
      <LoginScene
        {...this.state}
        handleLogin={this.handleLogin}
        handleRegisterRoute={this.handleRegisterRoute}
        handleForgotPasswordRoute={this.handleForgotPasswordRoute}
        onFieldChange={this.onFieldChange}
        busy={auth.login.busy}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
