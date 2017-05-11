/*
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import colors from '../../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CountryPropType} from '../../property/common/proptypes';

export default class CountryListScene extends Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
    onCountrySelect: PropTypes.func.isRequired,
    country: CountryPropType.isRequired,
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
  }

  renderRow = item => {
    let {onCountrySelect, country} = this.props;
    return (
      <View style={styles.row} key={item}>
        <TouchableHighlight
          onPress={() => onCountrySelect(item)}
          underlayColor="transparent">
          <View style={styles.rowContent}>
            <Text
              style={[
                styles.title,
                country.fullName === item && {
                  color: colors.accent,
                  fontWeight: '500',
                },
              ]}>
              {' '}{item}{' '}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  renderSeparator = (sectionID: number, rowID: number) => {
    return <View style={styles.separator} key={`${sectionID}-${rowID}`} />;
  };

  render() {
    const {countries} = this.props;
    let dataSource = this.ds.cloneWithRows(countries);

    return (
      <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        enableEmptySections={true}
        ref="listView"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        removeClippedSubviews={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    padding: 20,
  },
  rowContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    color: colors.darkGrey,
    fontWeight: '200',
  },
  separator: {
    flex: 1,
    height: 0.5,
    backgroundColor: colors.lightGrey,
  },
});
