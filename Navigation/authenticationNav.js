import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import EmailScreen from '../SignUp/EmailScreen.js';
import NameScreen from '../SignUp/NameScreen.js';
import PasswordScreen from '../SignUp/PasswordScreen.js'
import LoginScreen from '../Login/LoginScreen.js'

export const SignUpStack = StackNavigator({
  Email:{
    screen:EmailScreen
  },
  Name:{
    screen:NameScreen
  },
  Password:{
    screen:PasswordScreen
  },
},
{headerMode:'none'}
);

export const AuthStack = StackNavigator({
  LogIn:{
    screen:LoginScreen
  },
  SignUp:{
    screen: SignUpStack
  },
},
);
