/**
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {Animated, Easing, Text} from 'react-native';
import List from './../components/create/List';
import AddressPicker from './../components/create/AddressPicker';
import PropertyMeta from './../components/create/PropertyMeta';
import UploadImage from './../components/create/UploadImage';
import PropertyInfo from './../components/create/PropertyInfo';
import PropertyAmenities from './../components/create/PropertyAmenities';
import NavBar from './../../components/NavBar';
import NavButton from './../../components/NavButton';
import Header from './../components/create/Header';
import Footer from './../components/create/Footer';
import {CountryPropType} from './../common/proptypes';

export default class PropertyEditScene extends Component {
  static propTypes = {
    listing: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    amenities: PropTypes.array.isRequired,
    country: CountryPropType.isRequired,
    genders: PropTypes.array.isRequired,
    saving: PropTypes.bool.isRequired,
    updateStore: PropTypes.func.isRequired,
    saveProperty: PropTypes.func.isRequired,
    navBarTitle: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.fadeAnim = new Animated.Value(1);
  }

  animate = () => {
    this.fadeAnim = new Animated.Value(0.5);

    Animated.timing(this.fadeAnim, {
      toValue: 1, // Target
      duration: 2000, // Configuration
      easing: Easing.bounce,
    }).start();
  };

  updateMeta = (field, value) => {
    let payload = {
      [field]: value,
    };
    this.updateAttributes('meta', payload);
  };

  updateAddress = data => {
    const {state, country, city, latitude, longitude} = data;
    const payload = {state, country, city, latitude, longitude};

    this.updateAttributes('address', payload);
  };

  updateImage = images => {
    const payload = {
      replace: true,
      key: 'images',
      item: images,
    };
    this.updateStore(payload);
  };

  updateAmenities = amenity => {
    const payload = {
      replace: true,
      key: 'amenities',
      item: amenity,
    };
    this.updateStore(payload);
  };

  updateNearByPlaces = place => {
    const payload = {
      replace: true,
      key: 'nearByPlaces',
      item: place,
    };
    this.updateStore(payload);
  };

  updateMetaScene = () => {
    let hasError = false;
    let {meta} = this.props.listing.attributes;

    let requiredFields = ['price', 'description', 'email', 'phone1'];

    requiredFields.map(item => {
      if (!meta[item]) {
        hasError = true;
        return this.props.actions.setNotification(`${item} is required`, 'error');
      }
    });

    if (!hasError) {
      this.goToNextStage();
    }
  };

  onListItemSelect = (field, value) => {
    this.updateAttributes(field, value);
    this.goToNextStage();
  };

  goToPrevStage = () => {
    this.animate();
    const {stage} = this.props.listing;
    const payload = {stage: stage - 1};
    this.updateStore(payload);
  };

  goToNextStage = () => {
    this.animate();
    const {stage} = this.props.listing;
    const payload = {stage: stage + 1};
    this.updateStore(payload);
  };

  updateAttributes = (index, value) => {
    const payload = {
      attributes: {
        [index]: value,
      },
    };
    this.updateStore(payload);
  };

  updateStore = payload => {
    this.props.updateStore(payload);
  };

  saveProperty = () => {
    this.props.saveProperty();
  };

  render() {
    let {
      listing,
      types,
      categories,
      amenities,
      nearByPlaces,
      country,
      genders,
      saving,
      canGoBack,
      popBack,
      navBarTitle,
      metas,
    } = this.props;

    let {attributes, stage} = listing;
    let containerOpacity = this.fadeAnim;

    let navigateBack;
    if (canGoBack) {
      navigateBack = (
        <NavButton
          icon="ios-arrow-back"
          iconSize={33}
          onPress={() => popBack()}
          style={{height: 33, width: 30, marginLeft: -5}}
        />
      );
    } else {
      navigateBack = null;
    }

    return (
      <Animated.View style={{flex: 1, opacity: containerOpacity}}>

        <NavBar
          left={
            stage > 1
              ? <NavButton
                  icon="ios-arrow-back"
                  iconSize={33}
                  onPress={() => this.goToPrevStage()}
                  style={{height: 33, width: 30, marginLeft: -5}}
                />
              : navigateBack
          }
          middle={<Text style={{fontWeight: '500', fontSize: 17}}>{navBarTitle}</Text>}
        />

        {stage === 1 &&
          <List
            field="type"
            collection={types}
            header={<Header title="What type of Property you want to list ?" />}
            updateListing={this.onListItemSelect}
            selected={attributes.type}
          />}

        {stage === 2 &&
          <List
            field="category"
            header={<Header title="Select Category Type" />}
            collection={categories}
            updateListing={this.onListItemSelect}
            selected={attributes.category}
          />}

        {stage === 3 &&
          <AddressPicker
            country={country}
            address={attributes.address}
            category="Apartment"
            header={<Header title={'Where is your ' + attributes.category + ' located?'} />}
            updateAddress={this.updateAddress}
            updateListing={this.goToNextStage}
          />}

        {stage === 4 &&
          <PropertyMeta
            meta={attributes.meta}
            filters={metas}
            updateMeta={this.updateMeta}
            header={<Header title={'Just a little bit more about your ' + attributes.category + ''} />}
            footer={<Footer updateListing={this.goToNextStage} />}
          />}

        {stage === 5 &&
          <UploadImage
            images={attributes.images}
            updateImage={this.updateImage}
            header={<Header title={'Upload ' + attributes.category + ' Images'} />}
            footer={<Footer updateListing={this.goToNextStage} />}
          />}

        {stage === 6 &&
          <PropertyInfo
            attributes={attributes}
            genders={genders}
            onFieldChange={this.updateMeta}
            header={<Header title="You are almost there !!" />}
            footer={<Footer updateListing={this.updateMetaScene} />}
            country={country}
          />}

        {stage === 7 &&
          <PropertyAmenities
            collection={nearByPlaces}
            selected={attributes.nearByPlaces ? attributes.nearByPlaces : []}
            updateListing={this.updateNearByPlaces}
            header={<Header title="Near By Places" />}
            footer={<Footer updateListing={this.goToNextStage} />}
          />}

        {stage === 8 &&
          <PropertyAmenities
            collection={amenities}
            selected={attributes.amenities ? attributes.amenities : []}
            updateListing={this.updateAmenities}
            header={<Header title="Select Amenities" />}
            footer={
              <Footer updateListing={this.saveProperty} title={saving ? 'Saving ...' : 'Save'} disabled={saving} />
            }
          />}
      </Animated.View>
    );
  }
}
