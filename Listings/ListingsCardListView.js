import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, Image
} from 'react-native';
import { LinearGradient } from 'expo';
import {Avatar, Icon,Rating } from 'react-native-elements';
import {inject, observer} from "mobx-react";

import styles from '../Styles/listingStyles.js';
import {iconDimensions} from '../Styles/listingStyles.js';
import StarRating from 'react-native-star-rating';
import ListingDetailScreen from './ListingDetailScreen.js';
import Modal from 'react-native-modal';


@inject('listings')
@observer
export class ListingsCardListView extends Component{
  constructor(props){
    super(props);
  }



  componentWillMount(){
    this.goToDetailDebounced= this.debounce(function () {
     this.goToDetail.apply(this);
   }, 300);
  }



  showTopContainer(){
    if(!this.props.onSelfProfile){
      return(
        <View style = {styles.saveContainer}>
          <Icon
          reversed
          name='heart-outline'
          type='material-community'
          color='#f4f4f4'
          underlayColor='transparent'
          containerStyle = {{zIndex:999999}}
          size={30}
          onPress = {() => this.props.listings.handleSave(this.props.isSaved,this.props.listingUID, this.props.school,  this.props.uri, this.props.hostUID)}
        />

          <Icon
          name='heart'
          type='material-community'
          color = {this.props.isSaved ? '#FF5A5F':'rgba(59,68,75,.2)'}
          underlayColor='transparent'
          containerStyle = {{position:'absolute'}}
          size={28}
        />
        </View>
      );
    }
    else{
      return(
        <View style = {styles.editContainer}>
        <Icon
        reversed
        name='pencil'
        type='material-community'
        color='#f4f4f4'
        underlayColor='transparent'
        containerStyle = {{zIndex:999999}}
        size={28}
        onPress = {() => console.log('edit')}
      />
        </View>
      )
    }
  }

  showAvatar(){
    if(!this.props.onSelfProfile){
      return (
                    <View style = {styles.avatarContainer}>
                    <TouchableOpacity>
                    <View style = {styles.avatarUnderlay}>
                    <Avatar
                      width={50}
                      height = {50}
                      rounded
                      source={{uri: this.props.hostUri}}
                      onPress={() => this.goToProfile()}
                      activeOpacity={0.7}
                    />
                    </View>
                    </TouchableOpacity>

                    <Rating
                    imageSize={10}
                    readonly
                    startingValue={4}
                  />

                    </View>
      );
    }
  }

  goToDetail(){
    this.props.listings.initImages(this.props.listingUID, this.props.school, this.props.uri, this.props.index);
    this.props.listings.selectedIsSaved = this.props.isSaved;
    this.props.nav.navigate('ListingDetail',{ onSelfProfile:this.props.onSelfProfile});
  }

  goToProfile(){
    if(!this.props.listings.onaProfile){
    this.props.listings.onaProfile = true;
    this.props.nav.navigate('UserProfile', {hostUID:this.props.hostUID});
  //  console.log(this.props.hostUID);
}
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

  render(){

    return(
      <TouchableOpacity
      onPress = {()=> this.goToDetailDebounced()}
      activeOpacity={0.95}
      style = {{flex:1}} >

      <View style = {styles.listingsCardListView}>

  <Image style = {styles.listViewImage} source = {{uri:this.props.uri}}/>

      <View style = {styles.topContainer}>
        <Text style = {styles.priceTextListView}> ${this.props.price} </Text>
        {this.showTopContainer()}
      </View>

            <View style = {styles.bottomContainer}>
            <Text style = {styles.titleTextListView}> {this.props.title} </Text>
            <Text style = {{fontFamily:'Circular Book', color:'#767676',marginLeft:5}}>{this.props.space}</Text>
            </View>

            {this.showAvatar()}

          </View>

      </TouchableOpacity>
    );
  }
}

module.exports = ListingsCardListView;
