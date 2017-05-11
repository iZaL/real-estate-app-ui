/**
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import colors from '../../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Separator from '../../components/Separator';

export default class UserEditScene extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    pickImage: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    address: PropTypes.string,
    uploaded: PropTypes.bool.isRequired,
  };

  render() {
    const {
      user,
      uploaded,
      pickImage,
      onFieldChange,
      name,
      image,
      description,
      address,
    } = this.props;

    return (
      <ScrollView style={styles.container}>

        {uploaded
          ? <Image source={{uri: image}} style={styles.logo} />
          : user.image
              ? <Image source={{uri: user.image}} style={styles.logo} />
              : <FontAwesome
                  name="picture-o"
                  color="white"
                  size={200}
                  style={styles.emptyImageIcon}
                />}

        <View style={styles.editIconWrapper}>
          <TouchableHighlight onPress={pickImage} underlayColor="transparent">
            <FontAwesome
              name="camera"
              color={colors.darkGrey}
              size={18}
              style={styles.editIcon}
            />
          </TouchableHighlight>

        </View>

        <View style={styles.content}>
          <Text style={styles.label}>
            {user.isCompany ? 'Company Name' : 'Name'}
          </Text>
          <TextInput
            style={styles.textInput}
            defaultValue={user.name}
            onChangeText={text => onFieldChange('name', text)}
            placeholder="Name"
            placeholderTextColor={colors.lightGrey}
          />
          <Separator style={{marginVertical: 20}} />

          {user.isCompany &&
            <View style={{flex: 1}}>

              <Text style={styles.label}>Company Description</Text>
              <TextInput
                style={styles.textInput}
                defaultValue={user.company.description}
                onChangeText={text => onFieldChange('description', text)}
                multiline={true}
                placeholder="Description"
                placeholderTextColor={colors.lightGrey}
              />
              <Separator style={{marginVertical: 20}} />

              <Text style={styles.label}>Company Address</Text>
              <TextInput
                style={styles.textInput}
                defaultValue={user.company.address}
                onChangeText={text => onFieldChange('address', text)}
                placeholder="Address"
                placeholderTextColor={colors.lightGrey}
                multiline={true}
              />

              <Separator style={{marginVertical: 20}} />
            </View>}

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
    paddingTop: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.darkGrey,
  },
  label: {
    fontSize: 15,
    fontWeight: '100',
    color: colors.smokeGreyDark,
  },
  logo: {
    height: 200,
    width: Dimensions.get('window').width,
  },
  emptyImageIcon: {
    height: 200,
    backgroundColor: colors.smokeGreyLight,
    textAlign: 'center',
  },
  editIconWrapper: {
    position: 'absolute',
    top: 200,
    right: 15,
    marginTop: -20,
    height: 40,
    width: 40,
    borderRadius: 20,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.smokeGreyDark,
    shadowOpacity: 0.6,
    shadowOffset: {width: 1, height: 1},
  },
  textInput: {
    height: 30,
    fontSize: 16,
    marginVertical: 5,
  },
});
