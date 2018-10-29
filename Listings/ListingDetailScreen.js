import React, { Component } from 'react';
import { ActivityIndicator, Dimensions,Text,  View, Alert, TouchableOpacity, Image,ScrollView, TouchableHighlight
} from 'react-native';
import { LinearGradient } from 'expo';
import {Avatar,Button, Icon,Rating } from 'react-native-elements';
import Tag from '../Tag/Tag.js';
import SendMessageScreen from './SendMessageScreen.js';
import {inject, observer} from "mobx-react";

import styles from '../Styles/listingStyles.js';
import {iconDimensions} from '../Styles/listingStyles.js';

import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const that = null;


@inject('listings')
@observer
export class ListingDetailScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      onSelfProfile:false
    }
  }

  static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;

  return {
    headerStyle:{backgroundColor:'white'},
    headerLeft: (!params.onSelfProfile?
    <View style = {{flexDirection:'row'}}>
    <Icon
    name='close'
    type='material-community'
    color='#FF5A5F'
    size = {25}
    containerStyle={{marginBottom:10,marginLeft:10}}
    onPress={() => that.props.listings.clearListing(navigation)} />

    <Icon
    name='chevron-left'
    type='material-community'
    color='#FF5A5F'
    size = {30}
    containerStyle={{marginBottom:10,marginLeft:10}}
    onPress={() => that.props.listings.previousListing(that.props.listings.selectedIndex)} />

    <Icon
    name='chevron-right'
    type='material-community'
    color='#FF5A5F'
    size = {30}
    containerStyle={{marginBottom:10,marginLeft:10}}
    onPress={() => that.props.listings.nextListing(that.props.listings.selectedIndex)} />

    </View>
    :
    <View style = {{flexDirection:'row'}}>
    <Icon
    name='chevron-left'
    type='material-community'
    color='#FF5A5F'
    size = {30}
    containerStyle={{marginBottom:10,marginLeft:10}}
    onPress={() => that.props.listings.clearListing(navigation)} />
    </View>
  ),
    headerRight: (!params.onSelfProfile  ?
                <Button
                borderRadius={3}
                buttonStyle={{padding:16,marginTop:-10,height:20}}
                backgroundColor={'#FF5A5F'}
                color={'white'}
                textStyle={{fontSize:15,fontFamily:'Circular Medium'}}
                title='Send Request'
                onPress={() => that.sendHostDebounced()}
                />
                :
                <Button
                borderRadius={3}
                buttonStyle={{padding:16,marginTop:-10,height:20}}
                backgroundColor={'#FF5A5F'}
                color={'white'}
                textStyle={{fontSize:15,fontFamily:'Circular Medium'}}
                title='Edit Listing'
                onPress={() => that.sendHostDebounced()}
                />
              ),
  };
};

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


    componentWillMount(){
      const { state } = this.props.navigation;
      this.setState({
        onSelfProfile: state.params.onSelfProfile
      });

      this.sendHostDebounced= this.debounce(function () {
       this.sendHostRequest.apply(this);
     }, 700);
    }

  componentDidMount(){
   that = this;

  }

  showSaveContainer(){
    if(!this.state.onSelfProfile){
      return(
        <View style = {styles.saveContainer}>
          <Icon
          reversed
          name='heart-outline'
          type='material-community'
          color='#f4f4f4'
          underlayColor='transparent'
          containerStyle = {{zIndex:999999}}
          size={34}
          onPress = {() => this.props.listings.handleSave(this.props.listings.selectedIsSaved,this.props.listings.detailUID, this.props.listings.detailSchool,  this.props.listings.detailMainUri, this.props.listings.hostUid)}
        />
          <Icon
          name='heart'
          type='material-community'
          color={this.props.listings.isSavedListing(this.props.listings.selectedIsSaved)}
          underlayColor='transparent'
          containerStyle = {{position:'absolute'}}
          size={32}
        />
        </View>
      );
    }
  }

  showMessageButton(){
    if(!this.state.onSelfProfile){
      return(
        <TouchableOpacity style = {{justifyContent:'center',alignItems:'center',borderRadius:30, width:60, height:60,marginLeft:280, marginTop:-30}}
        activeOpacity={0.7}
        >
        <Icon
        raised
        name='comment-o'
        type='font-awesome'
        color='white'
        underlayColor="#FF5A5F"
        containerStyle = {{backgroundColor:'#FF5A5F'}}
        size={30}
       onPress = {() => this.openMessageScreen()}
      />
      </TouchableOpacity>
      );
    }
  }


  renderItem ({item, index}) {
    return (
        <Image style={{  height: 250 }} source = {{uri:item.uri}} /> // or { flex: 1 } for responsive height
    );
}

    renderTags(){
      var hostEmojis = [];
      var that = this;

      return this.props.listings.hostTags.map(function(item,i){
          return(
            <Tag
             key = {i}
             name = {item.name}
             emoji = {item.emoji}
             color = {item.color}
              />
          );
        });

    }

    openMessageScreen(){
      this.props.listings.sendMessageVisible = true;
    }

    sendHostRequest(){
      this.props.listings.sendRequest(this.props.listings.selectedIndex)
    }

  render(){
      if(this.props.listings.detailIsLoaded){

    return(
      <ScrollView  style = {{flex:1,backgroundColor:'white'}} keyboardShouldPersistTaps = {'always'}>

      <SendMessageScreen/>


      <Carousel
      data={this.props.listings.listingImages.slice()}
      renderItem={this.renderItem}
      sliderWidth={viewportWidth}
      itemWidth={viewportWidth}
      slideStyle={{ width: viewportWidth }}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
    />

    {this.showSaveContainer()}

    {this.showMessageButton()}
    <View style = {{marginTop:-5,marginLeft:20,width:330}}>

      <View style ={{width:260, marginTop:this.state.onSelfProfile ? 15 : 0}}>
      <Text style={styles.detailTitle}>{this.props.listings.detailTitle}</Text>
      </View>

      <View style={{marginLeft:2,marginTop:5,borderBottomWidth:0.5,borderBottomColor:'#dddddd',marginBottom:10}}>
      <Text style = {styles.detailSpace}>{this.props.listings.detailSpace}</Text>
      </View>
      <Text style = {{fontSize:18, fontFamily:'Circular Book'}}>About the Host <Text style = {styles.hostName}>{this.props.listings.hostName}</Text></Text>

      <View style = {{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'#dddddd',paddingBottom:30}}>

      <View style = {{flexDirection:'column'}}>
      {this.renderTags()}
      </View>

      <TouchableOpacity
      activeOpacity={0.8}
      style = {{position:'absolute',marginLeft:255,marginTop:5}}
      >
      <Image style={{width: 70,height:70,borderRadius:35}} source={{uri:this.props.listings.hostUri}}/>
      <Rating
      imageSize={13}
      readonly
      startingValue={4}
      />
      </TouchableOpacity>
      </View>

      <View style = {{marginTop:15,backgroundColor:'transparent',borderBottomWidth:0.5,borderBottomColor:'#dddddd',paddingBottom:15}}>
      <Text style = {{fontFamily:'Circular Bold',fontSize:18,color:'#3b444b'}}>About This Listing</Text>
      <Text style = {styles.detailDescription}>
      {this.props.listings.detailDescription}
      </Text>
      </View>

      <TouchableOpacity
      activeOpacity={0.6}
       style = {{paddingVertical:20, flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'#dddddd'}}>
      <Text style = {{fontFamily:'Circular Book',fontSize:19, color:'#3b444b'}}> House Rules </Text>

      <Icon
      name='chevron-right'
      type='material-community'
      color={'#dddddd'}
      underlayColor='transparent'
      containerStyle = {{position:'absolute',marginLeft:280,marginTop:18}}
      size={33}
    />
      </TouchableOpacity>


      <TouchableOpacity
      activeOpacity={0.6}
       style = {{paddingVertical:20, flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'#dddddd'}}>
      <Text style = {{fontFamily:'Circular Book',fontSize:19, color:'#3b444b'}}> Additional Prices </Text>

      <Icon
      name='chevron-right'
      type='material-community'
      color={'#dddddd'}
      underlayColor='transparent'
      containerStyle = {{position:'absolute',marginLeft:280,marginTop:18}}
      size={33}
    />
      </TouchableOpacity>

    </View>

    </ScrollView>
    );
  }

else{
  return(
    <View style = {{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
    <ActivityIndicator size = "large"/>
    </View>
  );
}
}
}

module.exports = ListingDetailScreen;
