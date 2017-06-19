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
import Profile from './../user/Profile';
import UserDetail from './../user/UserDetail';
import UserEdit from './../user/UserEdit';
import CountryList from './../user/CountryList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigator, TabNavigator} from 'react-navigation';
import colors from './colors';

const PropertyTab = StackNavigator(
  {
    PropertyHomeScene: {
      screen: PropertyHome,
      // navigationOptions: {
      //   title: () => 'Property Search',
      // },
    },
    LocationSearch: {
      screen: PropertyLocationPicker,
    },
    PropertyListScene: {
      screen: PropertyList,
      // navigationOptions: {
      //   title: () => 'Property Search',
      // },
    },
    PropertyDetailScene: {
      screen: PropertyDetail,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.property.meta.title}!`,
      }),
    },
    ProfileScene: {
      screen: Profile,
    },
  },
  {
    headerBackTitle:null,
    headerMode: 'screen',
  },
);

const FavoriteTab = StackNavigator(
  {
    FavoritesScene: {
      screen: PropertyFavorites,
      // navigationOptions: {
      //   title: () => 'Favorites',
      // },
    },
    PropertyDetailScene: {
      screen: PropertyDetail,
      // navigationOptions: {
      //   title: ({state}) => `${state.params.property.meta.title}!`,
      // },
    },
    ProfileScene: {
      screen: Profile,
    },
  },
  {
    headerBackTitle:null,
    headerMode: 'screen',
  },
);

const PropertyCreateTab = StackNavigator(
  {
    PropertyCreateScene: {
      screen: PropertyCreate,
      // navigationOptions: {
      //   title: () => 'Add Property',
      // },
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
      // navigationOptions: {
      //   title: () => 'Settings',
      // },
    },
    CountryListScene: {
      screen: CountryList,
      // navigationOptions: {
      //   title: () => 'Choose Country',
      // },
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
      // navigationOptions: {
      //   title: () => 'Manage Your Listings',
      // },
    },
    PropertyDetailScene: {
      screen: PropertyDetail,
      // navigationOptions: {
      //   title: ({state}) => `${state.params.property.meta.title}!`,
      // },
    },
    PropertyEditScene: {
      screen: PropertyEdit,
    },
    ProfileScene: {
      screen: Profile,
    },
  },
  {
    headerBackTitle:null,
    headerMode: 'screen',
  },
);

const Tabs = TabNavigator(
  {
    PropertyTab: {
      screen: PropertyTab,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{color: focused ? colors.accent : colors.smokeGreyDark}}
          />
        ),
      }
,
    },
    FavoritesTab: {
      screen: FavoriteTab,
      navigationOptions: {
        tabBarLabel: 'Favorites',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-star' : 'ios-star-outline'}
            size={26}
            style={{color: focused ? colors.accent : colors.smokeGreyDark}}
          />
        ),
      }
,
    },
    CreateTab: {
      screen: PropertyCreateTab,
      navigationOptions: {
        tabBarLabel: 'Add Property',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-cloud-upload' : 'ios-cloud-upload-outline'}
            size={26}
            style={{color: focused ? colors.accent : colors.smokeGreyDark}}
          />
        ),
      }
    },
    SettingsTab: {
      screen: SettingTab,
      navigationOptions: {
        tabBarLabel: 'More',
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
