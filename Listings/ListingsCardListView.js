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


  goToDetail(){
    this.props.listings.initImages(this.props.index);
    this.props.listings.selectedIsSaved = this.props.isSaved;
    this.props.nav.navigate('ListingDetail');
  }


  render(){

    return(
      <TouchableOpacity
      onPress = {()=> this.goToDetail()}
      activeOpacity={0.95}
      style = {{flex:1}} >

      <View style = {styles.listingsCardListView}>




  <Image style = {styles.listViewImage} source = {{uri:this.props.uri}}/>

      <View style = {styles.topContainer}>
        <Text style = {styles.priceTextListView}> ${this.props.price} </Text>

        <View style = {styles.saveContainer}>

          <Icon
          reversed
          name='heart-outline'
          type='material-community'
          color='#f4f4f4'
          underlayColor='transparent'
          containerStyle = {{zIndex:999999}}
          size={30}
          onPress = {() => this.props.listings.handleSave(this.props.index)}
        />

          <Icon
          name='heart'
          type='material-community'
          color={this.props.listings.isSavedListing(this.props.isSaved)}
          underlayColor='transparent'
          containerStyle = {{position:'absolute'}}
          size={28}
        />
        </View>
      </View>

            <View style = {styles.bottomContainer}>
            <Text style = {styles.titleTextListView}> {this.props.title} </Text>
            <Text style = {{fontFamily:'Circular Book', color:'#767676',marginLeft:5}}>{this.props.space}</Text>
            </View>


          <View style = {styles.avatarContainer}>
          <TouchableOpacity>
          <View style = {styles.avatarUnderlay}>
          <Avatar
            width={50}
            height = {50}
            rounded
            source={{uri: this.props.hostUri}}
            containerStyle = {styles.avatarPicture}
            onPress={() => console.log("Works!")}
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

          </View>

      </TouchableOpacity>
    );
  }
}

module.exports = ListingsCardListView;
