import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';



import {AuthStack} from './authenticationNav.js';
import {HomeTabs} from './homeNav.js';


export const RootNav = StackNavigator({
  Auth: {
    screen: AuthStack
  },
  Home:{
	  screen: HomeTabs
  },
},
{headerMode:'none'}

);
