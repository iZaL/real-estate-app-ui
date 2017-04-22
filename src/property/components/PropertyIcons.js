import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../common/colors';

export default class PropertyIcons extends Component {
  static propTypes = {
    services: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
  };

  renderIcon(value, icon, index) {
    return (
      <View key={index} style={styles.row}>
        <FontAwesome name={icon} size={15} color={colors.fadedBlack} />
        <Text
          style={{
            fontSize: 13,
            fontWeight: '100',
            marginHorizontal: 2,
            color: colors.black,
          }}>
          {value}
        </Text>
      </View>
    );
  }

  render() {
    const {services, items} = this.props;
    return (
      <View style={styles.container}>
        {items.map((item, i) => {
          switch (item) {
            case 'bedroom':
              return this.renderIcon(services[item], 'bed', i);
            case 'bathroom':
              return this.renderIcon(services[item], 'bath', i);
            case 'parking':
              return this.renderIcon(services[item], 'car', i);
            default:
              return null;
          }
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 10,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 15,
    paddingLeft: 5,
  },
  icon: {
    width: 20,
    height: 25,
    color: 'white',
  },
});
