import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert,
Keyboard} from 'react-native';
import {Avatar, ListItem, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";


@inject('inbox')
@observer
export class Message extends Component{

  	constructor(props){
  		super(props);
    }


    showTime(){

    }

    isUser(){
      if(this.props.isUser){
        return (
          <View style = {{ flex:1 ,flexDirection:'row',justifyContent:'flex-end'}}>

          <View style = {{ flexDirection:'column'}}>
          <View style = {{padding:10, backgroundColor:'#FF5A5F', borderRadius:15  }}>
          <Text style = {{fontFamily:'Circular Book', fontSize:15, color:'white', textAlign:'center'}}>
          {this.props.message}
          </Text>
          </View>

          <Text style = {{fontFamily:'Circular Book',fontSize:10, paddingRight:5, textAlign:'right'}}> 12/2/2017 12:19 PM </Text>
          </View>
          </View>
        );
      }
      else{
        return(
          <View style = {{ flex:1 ,flexDirection:'row',justifyContent:'flex-start', maxWidth:300}}>
          <Avatar
            width={40}
            height = {40}
            rounded
            source={{uri: this.props.uri}}

            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />

          <View style = {{ flexDirection:'column'}}>
          <View style = {{marginLeft:15, padding:10, backgroundColor:'#e5e6eb', borderRadius:15 }}>
          <Text style = {{fontFamily:'Circular Book', fontSize:15, color:'black', textAlign:'center'}}>
          {this.props.message}
          </Text>
          </View>

          <Text style = {{fontFamily:'Circular Book',fontSize:10, paddingLeft:15, textAlign:'left'}}> 12/2/2017 12:19 PM </Text>
          </View>
          </View>
        );
      }
    }

      render(){
        return(
        <View>
        {this.isUser()}
        </View>
      );
      }
  }


module.exports = Message;
