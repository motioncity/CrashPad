import React, { Component } from 'react';
import { Modal,Text,  View, Alert, TouchableOpacity, Image,ScrollView
} from 'react-native';
import {inject, observer} from "mobx-react";


@inject('auth')
@observer
export class SplashScreen extends Component{
  constructor(props){
    super(props);
  }

componentWillMount(){
  this.props.auth.splashVisible = true;
}

  componentDidMount () {
    setTimeout(() => {
      this.props.auth.splashVisible = false;
    }, 3000)
  }




  render(){
    return(
        <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.auth.splashVisible}
        >
        <View style = {{flex:1, backgroundColor:'#FF5A5F', justifyContent:'center',alignItems:'center'}}>
         <Text style = {{fontFamily:'Circular Bold', fontSize:30, color:'white', textAlign:'center'}}> CRASHPAD </Text>
       </View>
      </Modal>
    );
}
}

module.exports = SplashScreen;
