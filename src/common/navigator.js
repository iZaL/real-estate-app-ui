import React from 'react';
import PropertyHome from './../property/PropertyHome';
import PropertyLocationPicker from './../property/PropertyLocationPicker';
import Login from './../auth/Login';
import Register from './../auth/Register';
import Forgot from './../auth/Forgot';
import PropertyList from './../property/PropertyList';
import PropertyManager from './../property/PropertyManager';
import PropertyFilter from './../property/PropertyFilter';
import PropertyFavorites from './../property/PropertyFavorites';
import PropertyDetail from './../property/PropertyDetail';
import PropertyCreate from './../property/PropertyCreate';
import PropertyEdit from './../property/PropertyEdit';
import Settings from './../user/Settings';
import SelectLanguage from './../app/SelectLanguage';
import Profile from './../user/Profile';
import UserDetail from './../user/UserDetail';
import UserEdit from './../user/UserEdit';
import CountryList from './../user/CountryList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigator, TabNavigator} from 'react-navigation';
import colors from './colors';
import I18n from './../app/common/locale';

const PropertyTab = StackNavigator(
  {
    PropertyHomeScene: {
      screen: PropertyHome,
    },
    LocationSearch: {
      screen: PropertyLocationPicker,
    },
    PropertyListScene: {
      screen: PropertyList,
      navigationOptions: {
        title: I18n.t('property_search'),
      },
    },
    PropertyDetailScene: {
      screen: PropertyDetail,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.property.meta.title}!`,
      }),
    },
    ProfileScene: {
      screen: Profile,
    },
  },
  {
    headerBackTitle: null,
    headerMode: 'screen',
    // initialRouteName: 'PropertyListScene',
  },
);

const FavoriteTab = StackNavigator(
  {
    FavoritesScene: {
      screen: PropertyFavorites,
      navigationOptions: {
        title: I18n.t('favorites'),
      },
    },
    PropertyDetailScene: {
      screen: PropertyDetail,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.property.meta.title}!`,
      }),
    },
    ProfileScene: {
      screen: Profile,
    },
  },
  {
    headerBackTitle: null,
    headerMode: 'screen',
  },
);

const PropertyCreateTab = StackNavigator(
  {
    PropertyCreateScene: {
      screen: PropertyCreate,
      navigationOptions: {
        title: I18n.t('add_property'),
      },
    },
  },
  {
    headerMode: 'screen',
  },
);

const SettingTab = StackNavigator(
  {
    SettingsScene: {
      screen: Settings,
      navigationOptions: {
        title: I18n.t('settings'),
      },
    },
    CountryListScene: {
      screen: CountryList,
      navigationOptions: {
        title: I18n.t('choose_country'),
      },
    },
    UserDetailScene: {
      screen: UserDetail,
      navigationOptions: {},
    },
    UserEditScene: {
      screen: UserEdit,
      navigationOptions: {},
    },
    PropertyManager: {
      screen: PropertyManager,
      navigationOptions: {
        title: I18n.t('manage_your_listings'),
      },
    },
    PropertyDetailScene: {
      screen: PropertyDetail,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.property.meta.title}!`,
      }),
    },
    PropertyEditScene: {
      screen: PropertyEdit,
    },
    ProfileScene: {
      screen: Profile,
    },
    SelectLanguageScene: {screen: SelectLanguage},
  },
  {
    headerBackTitle: null,
    headerMode: 'screen',
  },
);

const Tabs = TabNavigator(
  {
    PropertyTab: {
      screen: PropertyTab,
      navigationOptions: {
        tabBarLabel: I18n.t('home'),
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{color: focused ? colors.accent : colors.smokeGreyDark}}
          />
        ),
      },
    },
    FavoritesTab: {
      screen: FavoriteTab,
      navigationOptions: {
        tabBarLabel: I18n.t('favorites'),
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-star' : 'ios-star-outline'}
            size={26}
            style={{color: focused ? colors.accent : colors.smokeGreyDark}}
          />
        ),
      },
    },
    CreateTab: {
      screen: PropertyCreateTab,
      navigationOptions: {
        tabBarLabel: I18n.t('add_property'),
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-cloud-upload' : 'ios-cloud-upload-outline'}
            size={26}
            style={{color: focused ? colors.accent : colors.smokeGreyDark}}
          />
        ),
      },
    },
    SettingsTab: {
      screen: SettingTab,
      navigationOptions: {
        tabBarLabel: I18n.t('more'),
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-more' : 'ios-more'}
            size={26}
            style={{color: focused ? colors.accent : colors.smokeGreyDark}}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: colors.accent,
    },
    animationEnabled: false,
    swipeEnabled: false,
    lazy: true,
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false,
      },
    },
    // initialRouteName: 'CreateTab',
  },
);

export default (Navigator = StackNavigator(
  {
    Tabs: {screen: Tabs},
    PropertyFilter: {
      screen: PropertyFilter,
      navigationOptions: {
        cardStack: {
          gesturesEnabled: false,
        },
      },
    },
    Login: {screen: Login},
    Register: {screen: Register},
    Forgot: {screen: Forgot},
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'Tabs',
  },
));
