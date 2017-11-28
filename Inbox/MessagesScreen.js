import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert,
Keyboard, ScrollView} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage,List, ListItem, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";



@inject('inbox')
@observer
export class MessagesScreen extends Component{

  	constructor(props){
  		super(props);
    }

      render(){
        return (
          
        );
      }
  }


module.exports = MesssagesScreen;
