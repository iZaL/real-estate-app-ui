import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import colors from './../../common/colors';

export default class Notification extends React.Component {
  static propTypes = {
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    messageType: React.PropTypes.string,
    actions: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.fadeAnim = new Animated.Value(1);
  }

  // componentDidMount() {
  //   StatusBar.setHidden(true);
  // }
  //
  // componentWillUnmount() {
  //   StatusBar.setHidden(false);
  // }

  shouldComponentUpdate(nextProps) {
    return this.props.message !== nextProps.message;
  }

  hideMessage = () => {
    this.props.actions.dismissNotification();
    StatusBar.setHidden(false);
  };

  showMessage = () => {
    StatusBar.setHidden(true);
    Animated.timing(this.fadeAnim, {
      toValue: 1, // Target
      duration: 500, // Configuration
      easing: Easing.bounce,
    }).start();
  };

  componentDidMount() {
    setTimeout(this.hideMessage, 4000);
    this.showMessage();
  }

  render() {
    const {messageType, message} = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          styles[messageType],
          {opacity: this.fadeAnim},
        ]}>
        <TouchableHighlight onPress={() => this.hideMessage()}>
          <Text style={styles.title}>{message}</Text>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingTop: 20,
    zIndex: 10000,
  },
  title: {
    color: colors.fadedWhite,
    fontSize: 18,
    fontWeight: '100',
    textShadowColor: colors.smokeGreyLight,
    textShadowOffset: {width: 0.2, height: 0.2},
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    color: colors.accent,
  },
  success: {
    backgroundColor: '#1ecd97',
  },
  error: {
    backgroundColor: '#fb797e',
  },
});
