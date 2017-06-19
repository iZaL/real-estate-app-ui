import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ACTIONS} from './common/actions';
import SelectLanguageScene from './scenes/SelectLanguageScene';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

class SelectLanguage extends Component {
  onLanguageSelect = name => {
    this.props.actions.setLanguage(name);
    this.props.actions.setBootstrapped(true);
    RNRestart.Restart();
  };

  render() {
    return <SelectLanguageScene onLanguageSelect={this.onLanguageSelect} />;
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);
