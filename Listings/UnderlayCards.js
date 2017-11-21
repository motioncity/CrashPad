import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, Image
} from 'react-native';
import { LinearGradient } from 'expo';
import {inject, observer} from "mobx-react";

import ListingsCard from './ListingsCard.js';

import styles from '../Styles/listingStyles.js';


@inject('listings')
@observer
export class UnderlayCards extends Component{
  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.listings.noUnderlay){
    return(
      <View style = {styles.secondUnderlayCard}>
        <ListingsCard price="900"/>
        </View>
    );
  }

  else{
    return null;
  }
}
}

module.exports = UnderlayCards;
