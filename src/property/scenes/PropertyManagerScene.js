/*
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import colors from '../../common/colors';
import moment from 'moment';
import Separator from './../../components/Separator';
import {CountryPropType} from './../common/proptypes';
import LoadingIndicator from './../../components/LoadingIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class PropertyManagerScene extends Component {
  static propTypes = {
    collection: PropTypes.array.isRequired,
    loadScene: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    country: CountryPropType.isRequired,
    editProperty: PropTypes.func.isRequired,
    deleteProperty: PropTypes.func.isRequired,
  };

  _shouldItemUpdate = (prev, next) => {
    return prev.item !== next.item;
  };

  renderRow = ({item, index}) => {
    const {loadScene, country, editProperty, deleteProperty} = this.props;

    return (
      <View style={styles.row}>

        <View style={{flex: 4}}>
          <TouchableHighlight
            onPress={() => loadScene(item)}
            underlayColor="transparent"
            key={index}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>

              <Image
                style={styles.image}
                source={{uri: item.images[0]}}
                resizeMode="cover"
              />

              <View style={{flex: 1, paddingLeft: 10}}>

                <Text style={styles.title}>{item.meta.title}</Text>

                <Text style={styles.price}>
                  {item.price}
                </Text>

                <Text style={styles.lightText}>
                  Added {moment(item.created_at).fromNow()}
                </Text>

                <Text style={[styles.lightText]}>
                  {item.views} Views
                </Text>

              </View>
            </View>

          </TouchableHighlight>
        </View>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <TouchableHighlight
            style={styles.buttonContainer}
            underlayColor="transparent"
            onPress={() => editProperty(item)}>
            <Ionicons name="md-create" size={30} color={colors.green} />

          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonContainer}
            underlayColor="transparent"
            onPress={() => deleteProperty(item)}>
            <Ionicons
              name="ios-trash"
              size={40}
              color={colors.red}
              style={{height: 35}}
            />
          </TouchableHighlight>
        </View>

      </View>
    );
  };

  render() {
    const {collection, isFetching, fetchProperties} = this.props;
    return (
      <FlatList
        style={styles.container}
        data={collection}
        renderItem={this.renderRow}
        enableEmptySections={true}
        ref="listView"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        initialListSize={10}
        onEndReachedThreshold={1}
        onEndReached={() => !isFetching && fetchProperties()}
        ListFooterComponent={() =>
          isFetching &&
          <LoadingIndicator
            isFetching={isFetching}
            style={{backgroundColor: 'white'}}
          />}
        ItemSeparatorComponent={() => <Separator />}
        shouldItemUpdate={this._shouldItemUpdate}
        getItemLayout={(data, index) => ({
          length: 92,
          offset: 92 * index,
          index,
        })}
        removeClippedSubviews={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
  },
  wrapper: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#2c2d30',
    fontWeight: '600',
  },
  image: {
    borderColor: colors.smokeGreyLight,
    borderWidth: 2,
    width: 75,
    height: 75,
    backgroundColor: 'rgba(0,0,0,.96)',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  price: {
    fontWeight: '600',
    fontSize: 16,
  },
  loadingImage: {
    width: 60,
    height: 60,
  },
  lightText: {
    color: colors.fadedBlack,
    fontWeight: '100',
    fontSize: 12,
  },
  buttonText: {color: colors.darkGrey, textAlign: 'center'},
  buttonContainer: {
    flex: 1,
  },
});
