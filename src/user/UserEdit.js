import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from './common/actions';
import UserEditScene from './scenes/UserEditScene';
import NavButton from '../components/NavButton';
import ImagePicker from 'react-native-image-crop-picker';
import {SELECTORS} from './common/selectors';

class UserEdit extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  state = {
    uploaded: false,
    image: null,
    name: null,
    company: {
      address: null,
      description: null,
    },
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <NavButton
          title="Done"
          onPress={() => navigation.state.params.handleRightButtonPress()}
        />
      )
    }
  };

  componentDidMount() {
    const {user} = this.props;
    this.setState({
      image: user.image,
      name: user.name,
    });
    if (user.isCompany) {
      this.setState({
        company: {
          address: user.company.address,
          description: user.company.description,
        },
      });
    }
    this.props.navigation.setParams({
      handleRightButtonPress: this.onSave,
    });
  }

  onFieldChange = (key, value) => {
    switch (key) {
      case 'address':
      case 'description':
        this.setState({
          company: {
            ...this.state.company,
            [key]: value,
          },
        });
        break;
      default:
        this.setState({
          [key]: value,
        });
    }
  };

  pickImage = () => {
    ImagePicker.openPicker({
      multiple: false,
    })
      .then(image => {
        this.setState({
          image: image.path,
          uploaded: true,
        });
      })
      .catch(e => {});
  };

  onSave = () => {
    this.props.actions.updateUser(this.state);
    this.props.navigation.goBack(null);
    // this.props.navigator.pop();
  };

  render() {
    const {user} = this.props;
    return (
      <UserEditScene
        {...this.state}
        user={user}
        pickImage={this.pickImage}
        onFieldChange={this.onFieldChange}
        onSave={this.onSave}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
