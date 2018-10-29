import React, { Component } from 'react';
import { ActivityIndicator, Dimensions,Text,  View, Alert, TouchableOpacity, Image, ScrollView
} from 'react-native';
import {inject, observer} from "mobx-react";
import { Avatar,Button, Icon } from 'react-native-elements';
import styles from '../Styles/listingStyles.js';


const that = null;


@inject('listings')
@observer
export class ProfileScreen extends Component{

  static navigationOptions = ({ navigation }) => {
  //const { params = {} } = navigation.state;
  return {
      title: 'Saved',
      headerTitleStyle :{textAlign:'center',color:'#838889',fontFamily:'Circular Bold',fontSize:20, backgroundColor:'transparent', marginTop:-3},
      headerStyle: {backgroundColor:'white'},
      headerRight:  <Icon name='settings' type='material-community' color='#FF5A5F' size={30} containerStyle={{marginRight:15}}/>,

  };
};
  constructor(props){
    super(props);
  }

  componentWillMount(){
        this.props.listings.initSelfProfile();
  }



  render(){
    return(

      <View style ={{flex:1, backgroundColor:'white', justifyContent:'center',alignItems:'center'}}>
      <Avatar
        width={100}
        height = {100}
        rounded
        source={{uri: this.props.listings.selfPhotoUrl}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      </View>

    );
  }
}

module.exports = ProfileScreen;
