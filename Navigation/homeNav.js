import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import {Text} from 'react-native';


import ListingsScreen from '../Listings/ListingsScreen.js';
import SavedScreen from '../SavedListings/SavedScreen.js';
import SavedSchoolScreen from '../SavedListings/SavedSchoolScreen.js';
import InboxScreen from '../Inbox/InboxScreen.js';



import ListingDetailScreen from '../Listings/ListingDetailScreen.js';
import MessagesScreen from '../Inbox/MessagesScreen.js';

export const SavedStack = StackNavigator({
  SavedSchools:{
    screen:SavedSchoolScreen
  },
  SavedListings:{
    screen:SavedScreen
  },
},
{headerMode:'none'}
);


export const Tabs = TabNavigator({
  Home: {
    screen: ListingsScreen,
    navigationOptions: {
      tabBarLabel:'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="home" type='font-awesome'size={23} color={tintColor} />
    },
  },
  Saved: {
    screen: SavedStack,
    navigationOptions: {
        tabBarLabel:'Saved',
      tabBarIcon: ({ tintColor }) => <Icon name="heart-o" type='font-awesome'size={20} color={tintColor} />
    },
  },
  Inbox: {
    screen: InboxScreen,
    navigationOptions: {
      tabBarLabel:'Inbox',
      tabBarIcon: ({ tintColor }) => <Icon name="envelope-o"   type='font-awesome' size={20} color={tintColor} />
    },
  },
},
{
  tabBarOptions:{
    activeTintColor:'#FF5A5F',

    style:{
      backgroundColor:'white'
    },
  },
});

export const HomeTabs = StackNavigator({
  Home:{
    screen:Tabs
  },
  ListingDetail:{
    screen:ListingDetailScreen
  },
  Messages:{
    screen: MessagesScreen
  }
},
{headerMode:'screen'}
);
