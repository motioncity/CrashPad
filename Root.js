import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, TouchableWithoutFeedback,
Keyboard
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";


import {HomeTabs} from './Navigation/homeNav.js';
import {RootNav} from './Navigation/rootNav.js';

import SplashScreen from './SplashScreen.js'


@inject('auth')
@observer
export class Root extends Component{


  	constructor(props){
  		super(props);
    }


     componentWillMount(){
       this.props.auth.isUserLoggedIn();
     }



      render(){
        if((this.props.auth.isLoggedIn==true)&&(this.props.auth.splashVisible==false)){
          return(
            <HomeTabs/>
          );
        }

        else if ((this.props.auth.isLoggedIn==false)&&(this.props.auth.splashVisible==false)){
        return(
           <RootNav/>
        );
      }
      else{
       return (
         <SplashScreen/>
        )
      }


  	}
  }


module.exports = Root;
