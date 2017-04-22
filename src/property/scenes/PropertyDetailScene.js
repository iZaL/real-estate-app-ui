/**
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {Animated, Dimensions, StyleSheet, Text, TouchableHighlight, View, Linking, Alert} from 'react-native';
import PropertyIcons from '../components/PropertyIcons';
import Favorite from '../components/Favorite';
import colors from '../../common/colors';
import PropertyMap from '../components/PropertyMap';
import Gallery from '../components/Gallery';
import YoutubePlayer from './../../components/YoutubePlayer';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Separator from './../../components/Separator';
import {CountryPropType} from './../common/proptypes';

export default class PropertyDetailScene extends Component {
  static propTypes = {
    property: PropTypes.object.isRequired,
    handleFavoritePress: PropTypes.func.isRequired,
    loadProfile: PropTypes.func.isRequired,
    onPinPress: PropTypes.func.isRequired,
    sceneType: PropTypes.string.isRequired,
    setSceneType: PropTypes.func.isRequired,
    country: CountryPropType.isRequired,
  };

  state = {
    scrollY: new Animated.Value(0),
  };

  renderImage = () => {
    let {property} = this.props;
    let {scrollY} = this.state;

    let logoScale = scrollY.interpolate({
      inputRange: [-50, 0, 100],
      outputRange: [1.5, 1, 1],
    });

    let logoTranslateY = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [40, 0, -40],
    });

    return (
      <View style={styles.hero}>
        <Animated.Image
          source={{uri: property.images[0]}}
          style={[
            styles.image,
            {
              transform: [{scale: logoScale}, {translateY: logoTranslateY}],
            },
          ]}
        />
      </View>
    );
  };

  makePhoneCall = number => {
    let url = `tel:${number}`;
    return Alert.alert(`Call ${number} ?`, '', [
      {text: 'Cancel'},
      {
        text: 'Yes',
        onPress: () => {
          return Linking.canOpenURL(url)
            .then(supported => {
              if (supported) {
                return Linking.openURL(url);
              }
            })
            .catch(err => console.error('could not send call', err));
        },
      },
    ]);
  };

  sendEmail = email => {
    let url = `mailto:${email}`;
    return Alert.alert(`Email ${email} ?`, '', [
      {text: 'Cancel'},
      {
        text: 'Yes',
        onPress: () => {
          Linking.canOpenURL(url)
            .then(supported => {
              if (supported) {
                return Linking.openURL(url);
              }
            })
            .catch(err => console.error('could not send email', err));
        },
      },
    ]);
  };

  render() {
    let {property, handleFavoritePress, loadProfile, onPinPress, sceneType, setSceneType, country} = this.props;

    let {scrollY} = this.state;

    switch (sceneType) {
      case 'mapScene': {
        return (
          <PropertyMap
            address={property.address}
            onPinPress={onPinPress}
            setSceneType={setSceneType}
            sceneType={sceneType}
          />
        );
      }

      case 'galleryScene': {
        return <Gallery images={property.images} setSceneType={setSceneType} sceneType={sceneType} />;
      }

      default: {
        return (
          <View style={styles.container}>

            {this.renderImage()}

            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              style={[StyleSheet.absoluteFill]}
              onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
                useNativeDriver: true,
              })}>
              <TouchableHighlight onPress={() => setSceneType('galleryScene')} underlayColor="transparent">
                <View style={styles.heroSpacer} />
              </TouchableHighlight>

              <View style={styles.contentContainerStyle}>

                <Text style={styles.title}>{property.meta.title}</Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>

                  <View style={{flex: 2}}>

                    <PropertyIcons services={property.meta || []} items={['bedroom', 'bathroom', 'parking']} />

                    <Text style={[styles.lightText]}>
                      Added {moment(property.created_at).fromNow()}
                    </Text>

                  </View>

                  <View style={{flex: 1}}>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>

                      <Text style={styles.price}>
                        {property.meta.price} {country.currency}
                      </Text>

                      <Favorite
                        handleFavoritePress={() => handleFavoritePress(property)}
                        isFavorited={property.isFavorited}
                      />

                    </View>

                    <Text style={[styles.lightText, {textAlign: 'center'}]}>
                      {property.views} views
                    </Text>

                  </View>

                </View>

                {property.user.isCompany &&
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 3,
                    }}>
                    <Text style={styles.lightText}>Added By </Text>
                    <TouchableHighlight
                      underlayColor="transparent"
                      onPress={() => loadProfile(property.user)}
                      style={{flex: 1}}>
                      <Text style={styles.username}>{property.user.name} </Text>
                    </TouchableHighlight>
                  </View>}

                <View style={styles.extraInfo}>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoTitle}>Area</Text>
                    <Text style={styles.infoResult}>
                      {property.meta.area} metre
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoTitle}>Social Status</Text>
                    <Text style={styles.infoResult}>
                      {property.meta.gender}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoTitle}>Address</Text>

                    <Text style={styles.infoResult}>
                      {property.address.city}
                      ,{' '}
                      {property.address.state}
                      {'. '}
                      {property.address.country}
                      {' '}
                    </Text>
                  </View>

                </View>

                <Separator />

                <View>
                  <Text style={styles.descTitle}>Description</Text>
                  <Text style={styles.description}>
                    {property.meta.description}
                  </Text>
                </View>

                <Separator style={[styles.separator, {marginVertical: 15}]} />

                <PropertyMap
                  address={property.address}
                  onPinPress={onPinPress}
                  sceneType={sceneType}
                  setSceneType={setSceneType}
                />

                {property.nearByPlaces &&
                  <View>
                    <Separator style={[styles.separator, {marginVertical: 15}]} />

                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text style={[styles.descTitle, {marginBottom: 10}]}>
                        Near By Places
                      </Text>
                      {property.nearByPlaces.map(place => <Text key={place} style={styles.amenity}>{place}</Text>)}
                    </View>
                  </View>}

                <Separator style={[styles.separator, {marginVertical: 15}]} />

                {property.amenities &&
                  <View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text style={[styles.descTitle, {marginBottom: 10}]}>
                        Property Amenities
                      </Text>
                      {property.amenities.map(amenity => (
                        <Text key={amenity} style={styles.amenity}>
                          {amenity}
                        </Text>
                      ))}
                    </View>

                    <Separator style={[styles.separator, {marginVertical: 15}]} />

                  </View>}

                {property.meta.email &&
                  <View style={[styles.infoRow]}>
                    <FontAwesome
                      name="envelope-o"
                      size={15}
                      style={{width: 20, height: 15, alignSelf: 'center'}}
                      color={colors.smokeGreyDark}
                    />
                    <Text style={styles.infoTitle}>Email</Text>
                    <Text
                      style={styles.infoResult}
                      onPress={() => {
                        this.sendEmail(property.meta.email);
                      }}>
                      {property.meta.email}
                    </Text>
                  </View>}

                <Separator style={[styles.separator, {marginVertical: 15}]} />

                <View style={[styles.infoRow, {paddingVertical: 5}]}>
                  <FontAwesome
                    name="mobile"
                    size={20}
                    style={{
                      width: 20,
                      height: 20,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    color={colors.smokeGreyDark}
                  />
                  <Text style={styles.infoTitle}>Mobile</Text>
                  <Text
                    style={styles.infoResult}
                    onPress={() => {
                      this.makePhoneCall(property.meta.phone1);
                    }}>
                    {property.meta.phone1}
                  </Text>

                </View>

                {!!property.meta.phone2 &&
                  <View>
                    <Separator style={[styles.separator, {marginVertical: 15}]} />

                    <View style={[styles.infoRow, {paddingVertical: 5}]}>
                      <FontAwesome
                        name="mobile"
                        size={20}
                        style={{
                          width: 20,
                          height: 20,
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}
                        color={colors.smokeGreyDark}
                      />
                      <Text style={styles.infoTitle}>Phone</Text>
                      <Text
                        style={styles.infoResult}
                        onPress={() => {
                          this.makePhoneCall(property.meta.phone2);
                        }}>
                        {property.meta.phone2}
                      </Text>
                    </View>
                  </View>}

                <Separator style={[styles.separator, {marginVertical: 15}]} />

                {property.video && <YoutubePlayer video={property.video} />}

              </View>
            </Animated.ScrollView>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 10,
    backgroundColor: 'white',
    minHeight: Dimensions.get('window').height - 250,
  },
  content: {
    flex: 1,
    margin: 10,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  tags: {
    marginTop: 10,
    flexDirection: 'row',
  },
  icons: {
    marginTop: 10,
    flexDirection: 'row',
  },
  title: {
    color: '#2c2d30',
    fontWeight: '600',
    marginBottom: 10,
  },
  descTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#2c2d30',
  },
  address: {
    marginTop: 10,
    fontSize: 14,
    color: '#2c2d30',
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'justify',
    color: '#384760',
    fontFamily: 'Avenir-Light',
  },
  amenity: {
    fontSize: 15,
    textAlign: 'justify',
    color: '#384760',
    fontFamily: 'Avenir-Light',
  },
  username: {
    color: colors.darkGrey,
  },
  label: {
    color: colors.grey,
    fontSize: 12,
  },
  price: {
    fontSize: 17,
    color: '#2c2d30',
    margin: 10,
    fontWeight: '600',
  },
  lightText: {
    color: colors.fadedBlack,
    fontWeight: '100',
    fontSize: 12,
    paddingVertical: 2,
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  heroSpacer: {
    height: 250,
    backgroundColor: 'transparent',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  extraInfo: {
    marginTop: 20,
  },
  infoTitle: {
    fontWeight: '100',
  },
  infoResult: {
    fontWeight: '500',
    paddingLeft: 10,
  },
});
