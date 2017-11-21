import React from 'react';
import { StyleSheet, Dimensions} from 'react-native';


var width = 320;
var height = 500;
var textColor= '#ecf0f1';
var themeColor = '255, 90, 95';
export const iconDimensions = 55;

export default StyleSheet.create({
  noMoreContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  noMoreText:{
    textAlign:'center',
    color:'#666666',
    fontFamily:'Circular Book',
    fontSize: 12
  },
  listingsContainer:{
    flex:1,
    backgroundColor:'white'
  },
  secondUnderlayCard:{
    position:'absolute',
    marginLeft:20,
    marginTop:68,
    zIndex:1
  },
  listingCard:{
    zIndex:9000,
    alignItems:'center',
    width:width,
    height: height,
    backgroundColor: '#fdfbfb',
    borderRadius:20,
    shadowOffset:{  width: 8,  height: 8,  },
    shadowColor: '#cfcfcf',
    shadowOpacity: 0.4,
  },
  listingsImage:{
    width:width,
    height:height,
    borderRadius:3,

  },
  titleContainer:{
    flexDirection:'row',
    position:'absolute',
    left:4,
    bottom:15,
    backgroundColor:'transparent'
  },
  priceText:{
    fontSize:27,
    color:textColor,
    fontFamily:'Circular Book',
  },
  titleText:{
    marginTop:-4,
    color:textColor,
    fontFamily:'Circular Book'
  },
  listingsCardListView:{

    backgroundColor:'white',
    width:400,
    height:285,
    marginBottom:20
  },
  listViewImage:{
    width:400,
    height:230
  },
  topContainer:{
    position:'absolute',
    left:-2,
    top:5,
    backgroundColor:'transparent'
  },
  bottomContainer:{
    flexDirection:'column',
    position:'absolute',
    left:25,
    bottom:6,
    backgroundColor:'transparent',
  },
  priceTextListView:{
    backgroundColor:'grey',
    color:textColor,
    fontFamily:'Circular Book',
    fontSize:30,
  },
saveContainer:{
  justifyContent:'center',
  alignItems:'center',
  position:'absolute',
  top:0,
  left:330
},
  titleTextListView:{
    color:'#3b444b',
    fontFamily:'Circular Book',
    fontSize:18,
  },
  avatarContainer:{
    flexDirection:'column',
    position:'absolute',
    left:300,
    bottom:20,
    backgroundColor:'transparent',
    justifyContent:'center',
    alignItems:'center'
  },
  avatarUnderlay:{
    width:54,
    height:54,
    borderRadius:27,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  },
  detailTitle:{
    fontFamily:'Circular Bold',
    color:'#3b444b',
    fontSize:36,
    textAlign:'left'
  },
  detailSpace:{
    fontFamily:'Circular Book',
    color:'#666666',
    fontSize:14,
    borderBottomWidth:20, borderBottomColor:'purple',
    flex:1
  },
  detailDescription:{
    fontFamily:'Circular Book',
    color:'#3b444b',
    fontSize:15,
    marginTop:10,
    marginBottom:10
  },
  hostName:{
    fontFamily:'Circular Book',
    color:'#FF5A5F',
    fontSize:18
  },
  disabledButton:{
  backgroundColor:'rgba('+themeColor +',.3)',
  opacity:0.9
},

});
