import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert,
Keyboard, ScrollView, FlatList, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage,List, ListItem, Icon} from 'react-native-elements';
import InputScrollView from 'react-native-input-scroll-view';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";

import Message from './Message.js';

const that = null;

@inject('inbox')
@observer
export class MessagesScreen extends Component{

  static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
      title: "Messages",
      headerTitleStyle :{textAlign:'center',color:'#838889',fontFamily:'Circular Bold',fontSize:17, backgroundColor:'transparent', marginTop:-3},
      headerStyle: {backgroundColor:'white'},
      headerLeft:
       <Icon
        name='chevron-left'
        type='material-community'
        color='#FF5A5F'
        size = {40}
        containerStyle={{marginLeft:10}}
        onPress={() => that.props.inbox.leaveMessages(navigation)} />,
  };
};

  	constructor(props){
  		super(props);
      this.state = {
        height: 0,
        refreshing:""
      }
    }

    componentDidMount(){
      that = this;

    }

    componentWillMount(){
      this.setState({
        refreshing:false
      })

      this.onEndDebounced = this.debounce(function () {
       this.onEnd.apply(this);
     }, 700);

     this.getMoreDebounced = this.debounce(function () {
      this.getMore.apply(this);
    }, 700);
    }

    debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }


    renderMessages = ({item}) => (
    <Message {...item} />
    );

    renderFooter = () => {

        if(this.state.refreshing){
        return (
          <View
            style={{
              paddingVertical: 20,
            }}
          >
            <ActivityIndicator animating size="small" />
          </View>
        );
      }

      else{
        return null;
      }
      };


    updateHeight(contentHeight){
      if(contentHeight < 150){
        this.setState({
          height:contentHeight
        })
      }
    }

    onEnd(){
      if(!this.state.refreshing && this.props.inbox.canLoadMoreMessages ){
        this.setState({
          refreshing:true
        })
      }
    }

    async getMore(){
      if(this.state.refreshing  && this.props.inbox.canLoadMoreMessages ){
      await this.props.inbox.getMoreMessages();
      this.setState({refreshing:false  })
    }
    }



    sendMessage(){
      if(!/^\s*$/.test(this.props.inbox.messageText)) {
        this.props.inbox.canLoadMoreMessages = true;
        this.props.inbox.sendMessage();
        var that = this;
        setTimeout(function(){  that.flatList.scrollToOffset({x: 0, y: 0, animated: true}); }, 200);

      }
    }

      render(){
        let messages = this.props.inbox.messages.slice();

        return (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={61}
            style = {{flex:1,backgroundColor:'white',height:400}}
          >

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <FlatList
            inverted
            ref={ref => this.flatList = ref}
            data= {messages.reverse()}
            renderItem={this.renderMessages}
            ListFooterComponent={this.renderFooter}
            onEndReached={(info)=>{
              if(info.distanceFromEnd >=-100 && this.props.inbox.canLoadMoreMessages){
                 this.onEndDebounced();
                this.getMoreDebounced();
              }
            }}
            onEndReachedThreshold={0.05}
            style = {{marginTop: -1 * this.state.height, paddingHorizontal:8, paddingBottom:30}}
            contentContainerStyle = {{paddingHorizontal:8, paddingBottom:30}}
          />

            </TouchableWithoutFeedback>

            <View style = {{flexDirection:'row',justifyContent:'center', alignItems:'center', backgroundColor:'white',padding:10, borderTopWidth:1, borderTopColor:'#eeeeee'}}>
            <View style = {{marginLeft:-30, borderRadius:20, borderWidth:2, backgroundColor:'#eeeeee', borderColor:'transparent', padding:9}}>
            <TextInput
            autoCapitalize = {'sentences'}
            placeholder=' Enter Message '
            onChangeText={(message) => this.props.inbox.messageText = message}
            value={this.props.inbox.messageText}
            multiline = {true}
            onContentSizeChange={(event) =>  this.updateHeight(event.nativeEvent.contentSize.height)}
            style = {{backgroundColor:"#eeeeee",color:'black', width:250,borderBottomWidth:0,height: Math.max(10, this.state.height), maxHeight:200}}
             />
             </View>

             <View style = {{position:"absolute", bottom:11, right:18}}>
             <Icon
              name='send'
              type='material-community'
              color='#FF5A5F'
              size = {30}
              containerStyle={{opacity: /^\s*$/.test(this.props.inbox.messageText) ? 0.2:1}}
              avatarStyle = {{position:'absolute'}}
              underlayColor = 'transparent'
              onPress={() => this.sendMessage()} />
              </View>
             </View>

            </KeyboardAvoidingView>

        );
      }
  }


module.exports = MessagesScreen;
