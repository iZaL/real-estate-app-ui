/**
 * @flow
 */
import React, {PropTypes} from 'react';
import {ListView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../../common/colors';
import Separator from './../../../components/Separator';

export default class PropertyAmenities extends React.Component {
  static propTypes = {
    selected: PropTypes.array.isRequired,
    updateListing: PropTypes.func.isRequired,
    collection: PropTypes.array.isRequired,
  };

  state = {
    descriptionHeight: 40,
    disabled: true,
  };

  renderRow = item => {
    const {updateListing, selected} = this.props;
    return (
      <TouchableHighlight style={{flex: 1}} onPress={() => updateListing(item)} underlayColor="transparent" key={item}>
        <View style={styles.row}>
          <Text style={styles.title}>{item}</Text>
          <View style={styles.checkbox}>
            {selected &&
              selected.includes(item) &&
              <FontAwesome key={item} name="check" size={16} color={colors.green} />}
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const {collection, header, footer} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = ds.cloneWithRows(collection);

    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          {header}
        </View>
        <View style={{flex: 5}}>
          <ListView
            dataSource={dataSource}
            style={styles.list}
            enableEmptySections={true}
            renderRow={this.renderRow}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            contentInset={{bottom: 50}}
            renderHeader={() => <View />}
            renderSeparator={(sectionId, rowId) => <Separator style={{marginVertical: 10}} key={rowId} />}
          />
        </View>
        {footer}
      </View>
    );
  }
}

PropertyAmenities.prototypes = {
  collection: React.PropTypes.array.isRequired,
  updateListing: React.PropTypes.func.isRequired,
  selected: React.PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: colors.smokeGreyLight,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  list: {
    flex: 1,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontWeight: '100',
    color: colors.darkGrey,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: colors.smokeGreyDark,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
