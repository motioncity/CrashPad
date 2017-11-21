import React, { Component } from 'react';
import { ActivityIndicator, Dimensions,Text,  View, Alert, TouchableOpacity, Image
} from 'react-native';
import {inject, observer} from "mobx-react";
import Emoji from 'react-native-emoji';

import styles from '../Styles/listingStyles.js';

@inject('listings')
@observer
export class SavedSchool extends Component{
  constructor(props){
    super(props);
  }


  goToSaved(){
    this.props.listings.selectedSavedSchool = this.props.schoolName;
    this.props.nav.navigate('SavedListings');
  }

  determineListing(){
    if(this.props.numberOfListings==1){
      return "Listing";
    }
    else{
      return "Listings";
    }
  }

  render(){
    return(
      <TouchableOpacity
      style = {styles.listingsCardListView}
      onPress={() => this.goToSaved()}
      activeOpacity={0.9}
      >
        <Image style= {styles.listViewImage} source= {{uri:this.props.uri}}/>
        <View style = {{marginLeft:30, marginTop:6}}>
        <Text style= {styles.titleTextListView}> {this.props.schoolName}</Text>
        <Text style = {{fontFamily:'Circular Book', color:'#767676',marginLeft:6}}>{this.props.numberOfListings} Saved {this.determineListing()}</Text>
        </View>
        </TouchableOpacity>
    );
  }
}

module.exports = SavedSchool;
