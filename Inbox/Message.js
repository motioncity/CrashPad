import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert,TouchableOpacity,
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
      var currentDate = new Date();
      var currentTime = currentDate.getTime();

      var shownTime;

      if(this.props.inbox.getDaysBetween(this.props.timeSent, currentTime) < 1){
        shownTime = this.props.inbox.formatTime(this.props.timeSent, currentTime)
      }
      else{
      shownTime = this.props.inbox.formatTime(this.props.timeSent, currentTime) +" "+ this.props.inbox.formatTime(this.props.timeSent);
    }

        if(this.props.showTime){
          if(this.props.isUser){
            return(
              <Text style = {{ color: '#808080',fontFamily:'Circular Book',fontSize:10, textAlign:'right', paddingTop:5, paddingBottom:this.props.isLast ? 5 : 15}}> {shownTime} </Text>
            );
          }
          else{
            return(
              <Text style = {{marginLeft:-20,color: '#808080',fontFamily:'Circular Book',fontSize:10, paddingLeft:15, textAlign:'left',paddingTop:5,paddingBottom:this.props.isLast ? 5 : 15}}> {shownTime} </Text>
            );
          }
        }
    }

    showAvatar(){
      if(this.props.showAvatar){
        return(
          <Avatar
            width={40}
            height = {40}
            rounded
            source={{uri: this.props.uri}}
            containerStyle = {{position:'absolute'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        );
      }
    }

    isUser(){
      if(this.props.isUser){
        return (
          <View style = {{ flex:1 ,flexDirection:'row',justifyContent:'flex-end'}}>
          <View style = {{ flexDirection:'column'}}>
          <View style = {{padding:10, backgroundColor:'#FF5A5F', borderRadius:15  }}>
          <Text style = {{fontFamily:'Circular Book', fontSize:15, color:'white'}}>
          {this.props.message}
          </Text>
          </View>
          {this.showTime()}
          </View>
          </View>
        );
      }
      else{
        return(
          <View style = {{ flex:1 ,flexDirection:'row',justifyContent:'flex-start', maxWidth:300}}>
          {this.showAvatar()}
          <View style = {{marginLeft:50, flexDirection:'column'}}>
          <View style = {{  padding:10,backgroundColor:'#e5e6eb', borderRadius:15 }}>
          <Text style = {{fontFamily:'Circular Book', fontSize:15, color:'black'}}>{this.props.message}</Text>
          </View>
          {this.showTime()}
          </View>
          </View>
        );
      }
    }

      render(){
        return(
        <TouchableOpacity
        activeOpacity = {0.7}
        style = {{paddingBottom:5}}
        >
        {this.isUser()}
        </TouchableOpacity>
      );
      }
  }


module.exports = Message;
