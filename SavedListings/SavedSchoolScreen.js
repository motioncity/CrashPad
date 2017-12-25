import React, { Component } from 'react';
import { ActivityIndicator, Dimensions,Text,  View, Alert, TouchableOpacity, Image, ScrollView
} from 'react-native';
import {inject, observer} from "mobx-react";
import { Button, Icon } from 'react-native-elements';
import styles from '../Styles/listingStyles.js';
import SavedSchool from './SavedSchool.js';

const that = null;


@inject('listings')
@observer
export class SavedSchoolScreen extends Component{

  static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
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
    this.props.listings.initSavedSchools();
  }

  componentDidMount(){
    that = this;
   }



  renderSchools(navigation){
    var schools = this.props.listings.savedSchools.slice();

    return schools.map((school,i)=>{
      return(
        <SavedSchool
        {...school}
        nav = {navigation}
        key={i}
        />
      );
    });
  }



  render(){
    return(
      <ScrollView style = {{flex:1, backgroundColor:'white'}}>
      {this.renderSchools(this.props.navigation)}
      </ScrollView>

    );
  }
}

module.exports = SavedSchoolScreen;
