import React, {Component} from 'react';
import {
  StyleSheet,
  SwipeableListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Separator from '../../components/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../common/colors';
import PropertyIcons from '../components/PropertyIcons';

export default class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: SwipeableListView.getNewDataSource(),
    };
  }

  getDataSource = () => {
    let items = this.props.collection;
    return this.state.dataSource.cloneWithRowsAndSections(items);
  };

  renderButtons = (rowData, sectionID, rowID) => {
    let {removeFilter} = this.props;
    return (
      <View style={styles.actionsContainer}>
        <TouchableHighlight
          onPress={() => {
            removeFilter(rowID, rowData);
          }}
          underlayColor="transparent">
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableHighlight>
      </View>
    );
  };

  renderRow = (item, sectionID, rowID) => {
    let {setFilter} = this.props;
    let type = rowID;
    let filter = item;
    return (
      <View key={sectionID}>
        <TouchableHighlight
          onPress={() => setFilter(rowID, item)}
          underlayColor={colors.smokeGreyLight}
          style={styles.row}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="ios-search"
              color={colors.smokeGreyLight}
              size={25}
              style={styles.searchIcon}
            />
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <Text style={styles.title}>
                {filter.category === 'Any'
                  ? 'Property '
                  : `${filter.category} `}
                {`${type}`}
                {' '}
                in
                {' '}
                {filter.searchString ? filter.searchString : filter.country}
              </Text>
              <PropertyIcons
                services={filter || []}
                items={['bedroom', 'bathroom', 'parking']}
              />
              <Text style={styles.title}>
                <Text style={{fontWeight: '500'}}>Price:</Text>
                {' '}
                {filter.priceFrom}
                {' '}
                -
                {' '}
                {filter.priceTo}
              </Text>
              <Text style={styles.title}>
                <Text style={{fontWeight: '500'}}>Sort by:</Text>
                {' '}
                {filter.sortBy}
                {' '}
                |
                {' '}
                {filter.total ? filter.total : 'No'}
                {' '}
                properties found
              </Text>

            </View>
          </View>
        </TouchableHighlight>

        <Separator />
      </View>
    );
  };

  render() {
    return (
      <SwipeableListView
        dataSource={this.getDataSource()}
        maxSwipeDistance={100}
        renderQuickActions={this.renderButtons}
        renderRow={this.renderRow}
        style={styles.container}
        removeClippedSubviews={false}
      />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
    color: 'white',
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  lightText: {
    color: colors.fadedBlack,
    fontWeight: '100',
    fontSize: 13,
  },
  searchText: {
    color: colors.smokeGreyDark,
    paddingLeft: 10,
    fontSize: 17,
  },
  searchHistory: {
    padding: 10,
  },
  historyTitle: {
    color: colors.smokeGreyDark,
    fontWeight: '100',
    fontSize: 15,
  },
  historyContent: {
    paddingTop: 5,
  },
  title: {
    color: colors.smokeGreyDark,
    fontWeight: '100',
    fontSize: 13,
  },
  historyContainer: {
    paddingTop: 10,
  },
  buttonText: {
    color: colors.fadedWhite,
    fontWeight: '100',
    fontSize: 15,
    padding: 10,
  },
});
