/**
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {ListView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import colors from '../../../common/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Separator from './../../../components/Separator';

export default class List extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    updateListing: PropTypes.func.isRequired,
    collection: PropTypes.array.isRequired,
    selected: PropTypes.string,
  };

  renderRow = item => {
    const {updateListing, field, selected} = this.props;
    return (
      <View key={item}>
        <TouchableHighlight onPress={() => updateListing(field, item)} underlayColor="transparent">
          <View style={styles.row}>
            <Text style={[styles.title, selected === item && {color: colors.accent}]}>
              {item}
            </Text>
            <Ionicons name="ios-arrow-forward" color={colors.smokeGreyLight} size={30} />
          </View>
        </TouchableHighlight>
        <Separator />
      </View>
    );
  };

  render() {
    const {collection, header} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = ds.cloneWithRows(collection);

    return (
      <View style={styles.container}>

        {header}
        <View style={styles.menuContainer}>
          <ListView
            dataSource={dataSource}
            style={styles.list}
            enableEmptySections={true}
            renderRow={this.renderRow}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            contentInset={{bottom: 50}}
            removeClippedSubviews={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuContainer: {
    justifyContent: 'flex-end',
  },
  descriptionContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: colors.darkGrey,
    fontWeight: '600',
    fontSize: 20,
    padding: 30,
    textAlign: 'center',
  },
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    flex: 1,
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  stage: {
    color: colors.darkGrey,
  },
});
