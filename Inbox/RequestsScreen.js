import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, TouchableWithoutFeedback,
Keyboard, ScrollView
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage,List, ListItem, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";



@inject('inbox')
@observer
export class RequestsScreen extends Component{



  	constructor(props){
  		super(props);
    }

    componentWillMount()
    {
        this.props.inbox.initRequests();
    }

    renderRequests()
    {
      var currentDate = new Date();
      var currentTime = currentDate.getTime();

      var that = this;

      return(
        this.props.inbox.requests.map((request, i) => (
          <ListItem
            key={i}
            onPress = {() => console.log(request.title)}
            underlayColor = {'#f2f3f4'}
            roundAvatar
            hideChevron = {false}

            rightIcon= {<View style = {{flexDirection:'row'}}>
             <Icon name='close'
             type='material-community'
             color='#838889'
             size={30}
             onPress = {() => that.props.inbox.removeRequest(request.key)}
             underlayColor= '#838889'
             containerStyle={{width:42, height: 42, marginRight:15, borderColor:'#838889', borderWidth:1, borderRadius:21}} />

              <Icon name='check'
              type='material-community'
              color='#FF5A5F'
              size={30}
              underlayColor= '#838889'
              containerStyle={{width:42, height: 42, marginRight:15, borderColor:'#FF5A5F', borderWidth:1, borderRadius:21}} />
            </View>}

            subtitle = {request.senderName}
            subtitleStyle = {{fontFamily:'Circular Book', paddingLeft:10}}
            style = {{borderTopWidth:0,borderBottomWidth:0, paddingVertical:20}}
            avatar={{uri:request.senderUri}}
            avatarStyle = {{width:40, height:40, borderRadius:20}}
            avatarContainerStyle = {{justifyContent:'center',alignItems:'center'}}
            title={request.title}
            titleContainerStyle= {{width:400}}
            titleStyle = {{fontSize:15, fontFamily:'Circular Book', paddingLeft:10}}

          />

        ))
      );
    }


      render(){

        if(!this.props.inbox.noRequests){

        return(
          <ScrollView style = {{flex:1,backgroundColor:'white'}}>
          <List containerStyle={{marginTop:1, borderTopWidth:0}}>
              {this.renderRequests()}
            </List>
            </ScrollView>
        );
      }
      else{
        return(
          <View style = {{flex:1, backgroundColor:'white'}}>
          </View>
        )
      }
  	}
  }


module.exports = RequestsScreen;
