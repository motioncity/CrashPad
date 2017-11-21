import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, TouchableWithoutFeedback,
Keyboard
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Icon} from 'react-native-elements';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";

//import styles from '../Styles/inboxStyles.js';

import RequestsScreen from './RequestsScreen.js';
import MessageThreadsScreen from './MessageThreadsScreen.js';



export class InboxScreen extends Component{

  static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
      title: 'Inbox',
      headerTitleStyle :{textAlign:'center',color:'#838889',fontFamily:'Circular Bold',fontSize:20, backgroundColor:'transparent', marginTop:-3},
      headerStyle: {backgroundColor:'white', borderBottomWidth:0},
      headerRight:  <Icon name='settings' type='material-community' color='#FF5A5F' size={30} containerStyle={{marginRight:15}}/>
  };
};


  	constructor(props){
  		super(props);
    }


      render(){
        return(
          <ScrollableTabView
          style={{paddingTop: 1,backgroundColor:'white' , justifyContent:'center',alignItems:'center'}}
          renderTabBar={() => <DefaultTabBar backgroundColor = 'white'/>}
          tabBarActiveTextColor = '#3b444b'
          tabBarInactiveTextColor= 'rgba(131, 136, 137,0.6)'
          tabBarUnderlineStyle={{backgroundColor:'#FF5A5F',height:1.5, borderBottomColor:'#FF5A5F', width:120, marginLeft:35
        }}
          tabBarTextStyle = {{ fontFamily: 'Circular Medium',fontSize:17, textAlign:'center'}}
          >
          <RequestsScreen tabLabel = 'Requests'/>
          <MessageThreadsScreen tabLabel = "Messsages"/>
          </ScrollableTabView>
        );
  	}
  }


module.exports = InboxScreen;
