import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert,
Keyboard, ScrollView} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage,List, ListItem, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";



@inject('inbox')
@observer
export class MessageThreadsScreen extends Component{

  	constructor(props){
  		super(props);
    }

    componentWillMount(){
      this.props.inbox.initThreads();
    }


    goToMessages(key){
      this.props.inbox.selectedThread = key;
      this.props.inbox.initMessages();
     this.props.nav.navigate('Messages');
    }


    renderThreads()
    {
      var currentDate = new Date();
      var currentTime = currentDate.getTime();

      return(
        this.props.inbox.threads.map((thread, i) => (
          <ListItem
            key={i}
            onPress = {() => this.goToMessages(thread.key)}
            underlayColor = {'#f2f3f4'}
            roundAvatar
            hideChevron = {true}
            rightTitle = {this.props.inbox.formatTime(thread.timeSent,currentTime)}
            subtitle = {thread.lastMessage}
            subtitleStyle = {{fontFamily:'Circular Book', paddingLeft:10}}
            containerStyle = {{borderTopWidth:0,borderBottomWidth:0, paddingTop:20, paddingBottom:10}}
            avatar={{uri:thread.uri}}
            avatarStyle = {{width:50, height:50, borderRadius:25}}
            avatarContainerStyle = {{justifyContent:'center',alignItems:'center'}}
            title= {thread.travellerName+ " - "+ thread.listingTitle}
            titleContainerStyle= {{width:400}}
            titleStyle = {{fontSize:15, fontFamily:'Circular Book', paddingLeft:10}}
          />

        ))
      );
    }



      render(){
        return (
          <ScrollView style = {{flex:1,backgroundColor:'white'}}>
          <List containerStyle={{marginTop:1, borderTopWidth:0}}>
              {this.renderThreads()}
            </List>
            </ScrollView>
        );
      }
  }


module.exports = MessageThreadsScreen;
