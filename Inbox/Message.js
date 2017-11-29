import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert,
Keyboard} from 'react-native';
import { ListItem, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";


@inject('inbox')
@observer
export class Message extends Component{

  	constructor(props){
  		super(props);
    }

      render(){

          if(this.props.isUser){
            return (
              <View style = {{backgroundColor:"pink"}}>
              <Text> {this.props.message} </Text>
              </View>
            );
          }

          else{
            return (
              <View>
              <Text> {this.props.message} </Text>
              </View>
            )
          }


      }
  }


module.exports = Message;
