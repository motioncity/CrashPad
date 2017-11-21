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




const stores = {
  auth:authenticationStore,
  listings:listingsStore,
  inbox: inboxStore
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
