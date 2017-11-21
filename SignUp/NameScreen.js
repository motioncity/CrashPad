import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, TouchableWithoutFeedback,
Keyboard
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import authenticationStore from '../Stores/authenticationStore.js';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";

import styles from '../Styles/authStyles.js'


@inject('auth')
@observer
export class NameScreen extends Component{

  static navigationOptions = {
  headerStyle:{ backgroundColor: 'white'},
  headerTintColor:'#F2D0DE'
  }

  	constructor(props){
  		super(props);
    }


  isValidNames()
  {
    if((this.props.auth.isEmpty(this.props.auth.firstName)) || (this.props.auth.isEmpty(this.props.auth.lastName))){
      return true;
    }
    return false;
  }

  goToLogIn()
  {
    this.props.navigation.navigate('LogIn')
  }

  goToPassword()
  {
    this.props.navigation.navigate('Password')
    //alert(this.props.auth.firstName);
  }


      render(){
        return(
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style = {[styles.authContainer, {marginTop:-150}]}>
          <View style = {styles.formContainer}>
          <Text style = {styles.headerText}>What is Your Name? </Text>

          <FormInput
          placeholder=' First Name'
          containerStyle = {styles.inputContainer}
          onChangeText={(firstName) => this.props.auth.firstName = firstName}
          value={this.props.auth.firstName}
           />

           <FormInput
           placeholder=' Last Name'
           containerStyle = {styles.inputContainer}
           onChangeText={(lastName) => this.props.auth.lastName = lastName}
           value={this.props.auth.lastName}
            />

           <FormValidationMessage>
           {this.props.auth.errorMessage}
           </FormValidationMessage>

           <Button
           buttonStyle = {styles.buttonContainer}
           disabled={this.isValidNames()}
           disabledStyle = {styles.disabledButton}
           title='Next'
           onPress={this.goToPassword.bind(this)}/>
           </View>

           <View style = {styles.authFooter}>
           <Text style = {styles.footerText}> Already have an Account?
           <Text style = {styles.authFooterText}
           onPress = {this.goToLogIn.bind(this)}> Log In Here</Text>
           </Text>
           </View>

          </View>

          </TouchableWithoutFeedback>


        );
  	}
  }


module.exports = NameScreen;
