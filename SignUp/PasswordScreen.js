import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, TouchableWithoutFeedback,
Keyboard
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import authenticationStore from '../Stores/authenticationStore.js';

import * as firebase from 'firebase';
import {inject,observer} from "mobx-react";

import styles from '../Styles/authStyles.js'


@inject('auth')
@observer
export class PasswordScreen extends Component{

  static navigationOptions = {
  headerStyle:{ backgroundColor: 'white'},
  headerTintColor:'#F2D0DE'
  }

  	constructor(props){
  		super(props);
    }


  validPasswords()
  {
    if((this.props.auth.isEmpty(this.props.auth.password1)) || (this.props.auth.isEmpty(this.props.auth.password2))){
      return true;
    }
    return false;
  }

  goToLogIn()
  {

    this.props.navigation.navigate('LogIn')
  }

  signUp()
  {
    if(this.props.auth.isValidPasswords()){
      this.props.auth.signUp();
      alert('You have been sent a verification email');
      this.goToLogIn();
    }
  }


      render(){
        return(
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style = {[styles.authContainer, {marginTop:-150}]}>
          <View style = {styles.formContainer}>
          <Text style = {styles.headerText}>Enter Your Password </Text>

          <FormInput
          autoCapitalize = {'none'}
          placeholder=' Enter Password'
          containerStyle = {styles.inputContainer}
          onChangeText={(password1) => this.props.auth.password1 = password1}
          secureTextEntry={true}
          value={this.props.auth.password1}
           />

           <FormInput
           autoCapitalize = {'none'}
           placeholder=' Repeat Password'
           containerStyle = {styles.inputContainer}
           onChangeText={(password2) => this.props.auth.password2 = password2}
           secureTextEntry={true}
           value={this.props.auth.password2}
            />

           <FormValidationMessage>
           {this.props.auth.errorMessage}
           </FormValidationMessage>

           <Button
           buttonStyle = {styles.buttonContainer}
           disabled={this.validPasswords()}
           disabledStyle = {styles.disabledButton}
           title='Next'
           onPress={this.signUp.bind(this)}/>
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


module.exports = PasswordScreen;
