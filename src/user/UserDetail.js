import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import {SELECTORS} from './common/selectors';
import UserDetailScene from './scenes/UserDetailScene';

class UserDetail extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  editUser = () => {
    const {user, navigation} = this.props;
    return navigation.navigate('UserEditScene', {
      user,
    });
  };

  render() {
    const {user} = this.props;
    return (
      <View style={{flex: 1}}>
        <UserDetailScene user={user} loadScene={this.editUser} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS}, dispatch)};
}

function mapStateToProps(state, props) {
  return {
    user: SELECTORS.getUser(state, props),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
