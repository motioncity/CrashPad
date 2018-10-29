import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo';
import {Provider} from 'mobx-react';

import * as firebase from 'firebase';


import Root from './Root.js';

import {RootNav} from './Navigation/rootNav.js';

import authenticationStore from './Stores/authenticationStore.js';
import listingsStore from './Stores/listingsStore.js';
import inboxStore from './Stores/inboxStore.js';
import profileStore from './Stores/profileStore.js';

var config = {
    apiKey: "AIzaSyDkUJjFh8zxkvPq-GsUL6WeOQtS9j_fMPc",
    authDomain: "crashpad-7f540.firebaseapp.com",
    databaseURL: "https://crashpad-7f540.firebaseio.com",
    projectId: "crashpad-7f540",
    storageBucket: "crashpad-7f540.appspot.com",
    messagingSenderId: "435444881291"
  };

firebase.initializeApp(config);


const stores = {
  auth:authenticationStore,
  listings:listingsStore,
  inbox: inboxStore,
  profile:profileStore
};

console.disableYellowBox = true;



export default class App extends Component {

  state = {
   fontLoaded: false,
 };


  async componentDidMount() {
    await Font.loadAsync({
      'Circular Bold': require('./assets/fonts/CircularStd-Bold.ttf'),
      'Circular Book': require('./assets/fonts/CircularStd-Book.ttf'),
      'Circular Medium': require('./assets/fonts/CircularStd-Medium.ttf')

    });

    this.setState({ fontLoaded: true });
  }

  render() {

    if(this.state.fontLoaded){
      return (
        <Provider {...stores}>
        <Root/>
        </Provider>
      );
    }

    else{
      return null;
    }

  }
}
