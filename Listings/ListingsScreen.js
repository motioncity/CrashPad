import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, Image, FlatList, ScrollView
} from 'react-native';
import { Button,Icon,Rating} from 'react-native-elements';
import ListingsCard from './ListingsCard.js';
import ListingsCardListView from './ListingsCardListView.js';

import {inject, observer} from "mobx-react";
import Swiper from "react-native-deck-swiper";

import UnderlayCards from './UnderlayCards.js'

import styles from '../Styles/listingStyles.js';

const that = null;

@inject('listings')
@observer
export class ListingsScreen extends Component{

  static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
      title: params.title,
      headerTitleStyle :{textAlign:'center',color:'#838889',fontFamily:'Circular Bold',fontSize:17, backgroundColor:'transparent', marginTop:-3},
      headerStyle: {backgroundColor:'white',borderBottomWidth:0},
      headerRight:  <Icon name='settings' type='material-community' color='#FF5A5F' size={30} containerStyle={{marginRight:15}}/>,
      tabBarOnPress: (scene, jumpToIndex) => {that.props.listings.onSaved= false; jumpToIndex(scene.index);}
  };
};


  	constructor(props){
  		super(props);
    }

    componentWillMount()
    {
      this.props.listings.initSavedListingIds();
    }

    componentDidMount(){
      that = this;
      var schoolName = this.props.listings.selectedSchool;
      this.props.navigation.setParams({ title: schoolName })
     }



  renderItems = ({item}) => (
  <ListingsCardListView {...item} nav={this.props.navigation}/>
  );


    render(){
      const list = true;

      let listings = this.props.listings.listings.slice();


      if((this.props.listings.cardsEmpty)||(this.props.listings.listings.length==0)){
        return(
          <View style = {styles.noMoreContainer}>
          <Text style = {styles.noMoreText}> There are currently no more listings at your selected school. </Text>
          </View>
        );
      }
      else if (list==true) {
        return(

          <View style = {{flex:1,backgroundColor:'white'}}>
          <FlatList
            data= {listings}
            renderItem={this.renderItems}
          />
          </View>
        );
      }
      else {
      return(
        <View style = {styles.listingsContainer}>
        <View style = {{zIndex:9000}}>
        <Swiper
          cards={listings}
          renderCard={(cardData) => <ListingsCard {...cardData} />}
          onSwiped={(cardIndex) => {this.props.listings.updateCards(cardIndex)}}
          onSwipedRight={(cardIndex) => {this.props.listings.sendRequest(cardIndex)}}
          onSwipedTop={(cardIndex)=>{this.props.listings.handleSave(cardIndex)}}
          onSwipedAll={() => {this.props.listings.noMoreCards()}}
          cardIndex={this.props.listings.cardIndex}
          backgroundColor={'white'}
          cardHorizontalMargin = {30}
          >
      </Swiper>
        </View>
        <UnderlayCards/>
        </View>
      );
  }
}
}

module.exports = ListingsScreen;
