import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, TouchableWithoutFeedback,
Keyboard
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";

import styles from '../Styles/authStyles.js';


@inject('auth')
@observer
export class EmailScreen extends Component{

  static navigationOptions = {
  headerStyle:{ backgroundColor: 'white'},
  headerTintColor:'#F2D0DE'
  }

  	constructor(props){
  		super(props);
    }


  async goToName()
  {
    if(this.props.auth.isValidEmail()){
    this.props.navigation.navigate('Name');
  }
  }

  goToLogIn()
  {
    this.props.navigation.navigate('LogIn')
  }


      render(){

        return(
          <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
          <View style = {[styles.authContainer, {marginTop:-150}]}>
          <View style = {styles.formContainer}>
          <Text style = {styles.headerText}>Enter Your College Email Address </Text>

          <FormInput
          autoCapitalize = {'none'}
          placeholder=' Email'
          containerStyle = {styles.inputContainer}
          keyboardType={'email-address'}
          onChangeText={(email) => this.props.auth.email = email}
          value={this.props.auth.email}
           />

           <FormValidationMessage>
           {this.props.auth.errorMessage}
           </FormValidationMessage>

           <Button
           buttonStyle = {styles.buttonContainer}
           disabled={this.props.auth.isEmpty(this.props.auth.email)}
           disabledStyle = {styles.disabledButton}
           title='Next'
           onPress={this.goToName.bind(this)}/>
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


module.exports = EmailScreen;
