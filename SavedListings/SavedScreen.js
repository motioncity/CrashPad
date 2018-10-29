import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, TouchableWithoutFeedback,
Keyboard, ScrollView, FlatList
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage,Icon, } from 'react-native-elements';
import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";

import ListingsCardListView from '../Listings/ListingsCardListView.js';

import styles from '../Styles/listingStyles.js';

const that = null;


@inject('listings')
@observer
export class SavedScreen extends Component{

  static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
      title: params.title,
      headerTitleStyle :{textAlign:'center',color:'#838889',fontFamily:'Circular Bold',fontSize:17, backgroundColor:'transparent', marginTop:-3},
      headerStyle: {backgroundColor:'white'},
      headerLeft:
       <Icon
        name='chevron-left'
        type='material-community'
        color='#FF5A5F'
        size = {40}
        containerStyle={{marginLeft:10}}
        onPress={() => that.props.listings.leaveSaved(navigation)} />,
        headerRight:  <Icon name='settings' type='material-community' color='#FF5A5F' size={30} containerStyle={{marginRight:15}}/>,
        tabBarOnPress: (data) => {
                  that.props.listings.onSaved= true;
                  that.props.listings.onSelfProfile = false;
                  that.props.listings.onListings = false;
                  that.props.listings.onaProfile = false;
                  var previousScene = data.previousScene;
                  var scene = data.scene;
                  data.jumpToIndex( scene.index );
              }
  };
};


  	constructor(props){
  		super(props);
    }

    componentWillMount()
    {
        this.props.listings.onSaved=true;
        this.props.listings.initSavedListingIdsSavedScreen();
    //  this.props.listings.initSavedListings();
    }

   componentDidMount(){
    that = this;
     var schoolName = this.props.listings.selectedSavedSchool;
     this.props.navigation.setParams({ title: schoolName })
    }


    renderItems = ({item}) => (
      <ListingsCardListView {...item} nav={this.props.navigation}/>
    );


       render(){
      let savedListings = this.props.listings.savedListings;

      if(savedListings.length==0){
        return(
          <View style = {styles.noMoreContainer}>

          </View>
        )
      }
      else{
        return(
        <View style = {{flex:1,backgroundColor:'white'}}>
        <FlatList
          data= {savedListings}
          renderItem={this.renderItems}
        />
        </View>
      );
    }
  	}
  }


module.exports = SavedScreen;
