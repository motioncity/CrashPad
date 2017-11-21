import React from 'react';
import { StyleSheet, Dimensions} from 'react-native';

const { width: viewportWidth} = Dimensions.get('window');

var themeColor = '255, 90, 95';
var radius = 4;

var width = Dimensions.get('window').width;

export default StyleSheet.create({
  topText:{
    fontFamily:'Circular Bold',
    fontSize:40,
    color:'rgb('+themeColor + ')'
  },
  authContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  formContainer:{
    width:350,
  },
  inputContainer: {
  paddingHorizontal:10,
  marginTop:15,
  borderColor:'gray',
  borderRadius: radius,
  borderWidth:.5,
  borderBottomWidth:.5,
  borderBottomColor:'gray'
},
  disabledButton:{
  backgroundColor:'rgba('+themeColor +',.3)',
  opacity:0.9
},
buttonContainer:{
  marginTop:25,
  backgroundColor:'rgba('+themeColor +',0.8)',
  borderRadius:radius
},
authFooter:{

  width:viewportWidth,
  borderTopColor:'gray',
  borderTopWidth:.3,
  position:'absolute',
  bottom:20
},
footerText:{
  fontFamily:'Circular Book',
  paddingTop:10,
  textAlign:'center'
},
authFooterText:{
  fontFamily:'Circular Book',
  color:'rgb('+themeColor + ')',
},
headerText:{
  fontFamily:'Circular Book',
  color:'rgb('+themeColor + ')',
  textAlign:'center',
  fontSize: 15,
}


});
