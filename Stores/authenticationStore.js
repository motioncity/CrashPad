import {observable, computed, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import {AsyncStorage} from 'react-native';
import * as firebase from 'firebase';



class authenticationStore
{

  @observable email = '';
  @observable password1='';
  @observable password2='';
  @observable password='';
  @observable firstName = '';
  @observable lastName = '';

  @observable userID='';
  @observable userDisplayName = '';
  @observable userPhotoUrl = '';
  @observable errorMessage = '';

  @observable isLoggedIn = "pending";

  @observable splashVisible = false;




isEmpty(value){
  if(value ==''){
    return true;
  }
  return false;
}

isEdu(){
  lastFour = this.email.substring(this.email.length-4);
  if(lastFour == '.edu'){
    return true;
  }
  return false;
}

isValidEmail(){
  var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

  if(!re.test(this.email)){
    this.errorMessage = "Please enter a valid email addresss";
    return false;
  }

  else if(!this.isEdu()){
    this.errorMessage = 'Must be an .edu email address';
    return false;
  }

  else{
    this.errorMessage = '';
    return true;

  }
}

@action
isValidPasswords()
{
  if(this.password1 != this.password2){
    this.errorMessage = 'Passwords do not match';
    return false;
  }
  else if (this.password1.length < 6){
    this.errorMessage = 'Password must be longer than 6 characters';
    return false;
  }
  return true;
}

isNotValidLogin(){
 if((this.email=='') || (this.password.length <6)){
   return true;
 }
 return false;
}


@action
async signUp(){

  var that = this;
  this.password = this.password1;

  try{
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
      let user = firebase.auth().currentUser;



      user.sendEmailVerification().then(function() {

        user.updateProfile({
         displayName:that.firstName+' ' + that.lastName,
         photoURL: "http://thefader-res.cloudinary.com/images/w_1440,c_limit,f_auto,q_auto:best/Fader_Drake_Peckmezian_high_res_v3-2015-08-31_010_auffnh_xjzrgq/drake-views-teenagers.jpg"
       }).then(function() {

         firebase.database().ref('/Users/' + user.uid + '/UserData').set({
             firstName: that.firstName,
             lastName:that.lastName,
             profileUrl: user.photoURL
           });
         // Update successful.
        }).catch(function(error) {
         // An error happened.
       });


      })
      this.password1 = '';
      this.password2= '';
      this.password='';
      this.errorMessage = '';
        }

  catch(error){

         this.errorMessage = error.message;
  }
}


   @action
   async login()
   {
     try{
         await firebase.auth().signInWithEmailAndPassword(this.email, this.password);

         let user = firebase.auth().currentUser;

         if((user) && (user.emailVerified)){
           try{


             try{
                 await AsyncStorage.setItem('userID', user.uid);
                 await AsyncStorage.setItem('userDisplayName', user.displayName);
                 await AsyncStorage.setItem('userPhotoUrl', user.photoURL);

             }
             catch(error){
               alert(error.message);
             }

               this.email = '';
               this.password='';
               this.errorMessage = '';

           }
           catch(error){
             this.errorMessage = error.message;
             alert(error.message);
           }
         }
     }

     catch(error){
       this.errorMessage = error.message;
     }
   }



   @action
   async isUserLoggedIn(){

     var that = this;

     firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            that.isLoggedIn = true;

          }
          else {
            that.isLoggedIn = false;
          }
        });

   }


   @action
   async logout()
   {

     try{

         let user = firebase.auth().currentUser;

         if(user){
           try{
               await AsyncStorage.setItem('uID', '');

               this.userID = '';
               firebase.auth().signOut();
           }
           catch(error){
             alert(error.message);
           }
         }
     }

     catch(error){
      alert(error.message);
     }

   }


   @action noSplash(){
     this.splashVisible = false;
   }
}

export default new authenticationStore();
