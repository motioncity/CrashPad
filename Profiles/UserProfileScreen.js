import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert, TouchableOpacity, Image, FlatList, ScrollView
} from 'react-native';
import {inject, observer} from "mobx-react";
import { LinearGradient } from 'expo';
import {Avatar, Icon,Rating } from 'react-native-elements';
import {iconDimensions} from '../Styles/listingStyles.js';
import StarRating from 'react-native-star-rating';

import ListingsCardListView from '../Listings/ListingsCardListView.js';

const that = null;
@inject('profile', 'listings')
@observer
export class UserProfileScreen extends Component{

  static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
    header:null,
    tabBarOnPress: (data) => {
              that.props.listings.onaProfile = true;
              that.props.listings.onSelfProfile= false;
              that.props.listings.onSaved = false;
              that.props.listings.onListings = false;
              var previousScene = data.previousScene;
              var scene = data.scene;
              data.jumpToIndex( scene.index );
          }
  };
};


  constructor(props){
    super(props);
  }

  componentDidMount(){
    that = this;


  }


  componentWillMount()
  {
      const { state } = this.props.navigation;
    //  console.log(this.props.navigation.state);
    //  if(state.params){
      //    this.props.listings.initUserListings(state.params.hostUID);
      //}
      //else{
          this.props.listings.initUserProfile(state.params.hostUID);
      //}
    //  let userID = state.params.hostUID == undefined ?

  }


  renderItems = ({item}) => (
  <ListingsCardListView {...item} nav={this.props.navigation}/>
  );

  showBackButton(){
    if(!this.props.listings.onSelfProfile){
      return(
        <Icon
        name='chevron-left'
        type='material-community'
        underlayColor = "transparent"
        color='white'
        size = {45}
        containerStyle={{position:'absolute',zIndex:9000000, top:10, left:10}}
        onPress={() => this.props.listings.leaveProfile(this.props.navigation)} />
      );
    }
  }

  render(){
    let userListings = this.props.listings.userListings.slice();
    //let userListings = this.props.listings.listings.slice().filter(listing => listing.hostUID == this.props.listings.profileUID);
    let userRating = parseInt(this.props.listings.userRating);

    if(this.props.listings.profileLoaded){

    return(
      <ScrollView style = {{flex:1, backgroundColor:'white'}}>

      <Icon
      name='chevron-left'
      type='material-community'
      underlayColor = "transparent"
      color='white'
      size = {45}
      containerStyle={{position:'absolute',zIndex:9000000, top:10, left:10}}
      onPress={() => this.props.listings.leaveProfile(this.props.navigation)} />

    <Image style = {{position:'absolute',width:400, height:200}} source = {{uri:this.props.listings.userCoverUrl}}/>


      <View style = {{ marginTop:100,backgroundColor:'transparent',height:250, justifyContent:'center',alignItems:'center'}}>

      <View style = {{position:'absolute',top:40, justifyContent:'center', alignItems:'center', backgroundColor:'white', width:110, height:110, borderRadius:55}}>
      <Avatar
        width={100}
        height = {100}
        rounded
        source={{uri: this.props.listings.userPhotoUrl}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />

      </View>

      <View style = {{position:'absolute',top:150,justifyContent:'center', alignItems:'center'}}>
      <Text style = {{color:'grey',textAlign:'center',fontFamily:'Circular Bold', fontSize:20}}>{this.props.listings.userName} </Text>

      <View style = {{height:20, flexDirection:"row"}}>
      <Icon
      name='school'
      type='material-community'
      color = {'#FF5A5F'}
      underlayColor='transparent'
      containerStyle={{marginLeft:-20, paddingRight:5}}
      size={28}
    />
    <Text style = {{fontFamily:'Circular Bold', textAlign:'center'}}>
    {this.props.listings.userSchool}
    </Text>
    </View>

      <StarRating
      emptyStar={'ios-star-outline'}
      fullStar={'ios-star'}
      halfStar={'ios-star-half'}
      iconSet={'Ionicons'}
      starSize={15}
      disabled = {true}
      starColor = {"gold"}
      rating={userRating}
    />
      </View>
      </View>

      <View style = {{marginTop:-25, justifyContent:'center', alignItems:'center'}}>
      <Text style = {{paddingBottom:25, maxWidth:300, textAlign:'center', color:'gray', fontFamily:'Circular Book'}}>
      {this.props.listings.userBio}
      </Text>
      </View>

      <FlatList
        data= {userListings}
        renderItem={this.renderItems}
      />

      </ScrollView>
    )
  }
  else {
    return(
      <View style = {{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size = "large"/>
      </View>
    )
  }
  }
}

module.exports = UserProfileScreen;
