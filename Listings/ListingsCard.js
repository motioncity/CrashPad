import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, Image
} from 'react-native';
import { LinearGradient } from 'expo';
import {Avatar, Icon,Rating } from 'react-native-elements';

import styles from '../Styles/listingStyles.js';
import {iconDimensions} from '../Styles/listingStyles.js';
import StarRating from 'react-native-star-rating';



export class ListingsCard extends Component{
  constructor(props){
    super(props);
  }

  render(){
    var uri = this.props.uri;
    return(
      <View style = {styles.listingCard}>



  <Image style = {styles.listingsImage} source = {{uri:this.props.uri}}/>


      <View style = {styles.titleContainer}>
      <TouchableOpacity>
      <Avatar
        width={50}
        height = {50}
        rounded
        source={{uri: this.props.hostUri}}
        containerStyle = {styles.avatarPicture}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      </TouchableOpacity>

            <View style = {{flexDirection:'column'}}>
            <Text style = {styles.priceText}> {this.props.price} </Text>
            <Text style = {styles.titleText}> {this.props.title} </Text>
          </View>

      </View>

      </View>
    );
  }
}

module.exports = ListingsCard;
