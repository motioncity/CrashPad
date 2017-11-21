import React, { Component } from 'react';
import { Modal,Text,  View, Alert, TouchableOpacity, Image,ScrollView, Keyboard,
} from 'react-native';
import {inject, observer} from "mobx-react";
import {Avatar,Button, FormInput, Icon } from 'react-native-elements';

import styles from '../Styles/listingStyles.js';

@inject('listings')
@observer
export class SendMessageScreen extends Component{
  constructor(props){
    super(props);
  }




sendMessage(){
  this.props.listings.sendMessageToHost();
  this.props.listings.sendMessageVisible = false;


}
closeMessageScreen(){
  this.props.listings.sendMessageVisible = false;
  this.props.listings.messageToHost = "";
}

  render(){
    return(
        <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.listings.sendMessageVisible}
        >

       <View style = {{flex:1, backgroundColor:'white'}} >
        <View style = {{flexDirection:'row',position:'absolute', top:40}}>

        <Icon
        name='close'
        type='material-community'
        color='#FF5A5F'
        size = {25}
        containerStyle={{marginTop:-20,marginLeft:5,padding:10}}
        onPress = {() => this.closeMessageScreen()} />

        <Button
         disabled={this.props.listings.messageToHost  == ""}
         disabledStyle = {styles.disabledButton}
         borderRadius={3}
         buttonStyle={{padding:16,marginTop:-10,height:20, left:160}}
         backgroundColor={'#FF5A5F'}
         color={'white'}

         textStyle={{fontSize:15,fontFamily:'Circular Medium'}}
         title='Send Message'
         onPress={() => this.sendMessage()}
            />

        </View>
        <View style = {{marginTop:100, backgroundColor:'transparent',padding:20}}>

        <View style = {{width:260}}>
        <Text style = {{fontSize:20, fontFamily:'Circular Book'}}>Send a Message to {this.props.listings.hostName} </Text>
        </View>

        <View style = {{flexDirection:'row', marginTop:20}}>

        <View style = {{width:200}}>
        <Text style = {{fontFamily:'Circular Book'}}>
        Send a message to the host to ask questions about the listing before you send a request to book.
        </Text>
        </View>


        <Avatar
          width={90}
          height = {90}
          rounded
          source={{uri: this.props.listings.hostUri}}
          containerStyle = {{marginLeft:30}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />


        </View>

        <ScrollView>
        <FormInput
        autoFocus={true}
        autoCorrect = {false}
        placeholder=' Type Message Here'
        containerStyle={{marginTop:15, marginLeft:0,borderBottomWidth:0}}
        style = {{fontFamily:'Circular Book', fontSize:15}}
        multiline = {true}
        onChangeText={(message) => this.props.listings.messageToHost =message}
        value={this.props.listings.messageToHost}
         />
         </ScrollView>

       </View>
      </View>
      </Modal>
    );
}
}

module.exports = SendMessageScreen;
