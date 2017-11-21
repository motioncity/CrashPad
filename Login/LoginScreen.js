import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, TouchableWithoutFeedback,
Keyboard
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";

import styles from '../Styles/authStyles.js'


@inject('auth')
@observer
export class LoginScreen extends Component{

  static navigationOptions = {
    header: <View style={{backgroundColor:'white'}}></View>
  }

  	constructor(props){
  		super(props);
    }


  login()
  {
      Keyboard.dismiss();
    this.props.auth.login();
    this.props.auth.isUserLoggedIn();
    if(this.props.auth.isLoggedIn){
    this.props.navigation.navigate('Home');
  }
  }

goToSignUp()
{
  this.props.navigation.navigate('SignUp');
}

      render(){
        return(
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style = {[styles.authContainer, {marginTop:-150}]}>
          <Text style = {styles.topText}>CRASHPAD</Text>
          <View style = {styles.formContainer}>
          <FormInput
          autoCapitalize = {'none'}
          placeholder=' Email'
          containerStyle = {styles.inputContainer}
          keyboardType={'email-address'}
          onChangeText={(email) => this.props.auth.email = email}
          value={this.props.auth.email}
           />

           <FormInput
           autoCapitalize = {'none'}
           placeholder=' Password'
           containerStyle = {styles.inputContainer}
           onChangeText={(password) => this.props.auth.password = password}
           secureTextEntry={true}
           value={this.props.auth.password}
            />
            <FormValidationMessage>
            {this.props.auth.errorMessage}
            </FormValidationMessage>

           <Button
           buttonStyle = {styles.buttonContainer}
           disabled={this.props.auth.isNotValidLogin()}
           disabledStyle = {styles.disabledButton}
           title='Login'
           onPress={this.login.bind(this)}/>
           </View>

           <View style = {styles.authFooter}>
           <Text style = {styles.footerText}> Do not have an Account?
           <Text style = {styles.authFooterText}
           onPress = {this.goToSignUp.bind(this)}> Sign Up Here</Text>
           </Text>
           </View>

           </View>
           </TouchableWithoutFeedback>
        );

  	}


  }


module.exports = LoginScreen;
