import {observable, computed, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import * as firebase from 'firebase';
import {AsyncStorage} from 'react-native';

import authenticationStore from '../Stores/authenticationStore.js';


class listingsStore {
    @observable listings = [];
    @observable savedIds = [];
    @observable savedIdsSavedScreen = [];

    @observable savedListings = [];
    @observable userListings = [];
    @observable hostTags = [];

    @observable userListings = [];

    @observable cardIndex = 0;
    @observable cardsEmpty = true;

    @observable noUnderlay = false;

    @observable selectedSchool = 'University of Delaware';

    @observable view = "List";

    @observable selectedSavedSchool = "";
    @observable savedSchools = [];

    @observable hostUri;
    @observable hostUid = "";
    @observable hostName = "";

    @observable detailUID = "";
    @observable detailSchool = "";
    @observable detailMainUri = "";


    @observable detailTitle = "";
    @observable detailDescription = "";
    @observable detailSpace = "";
    @observable listingImages = [];

    @observable selectedIsSaved = false;
    @observable detailIsLoaded = false;
    @observable selectedIndex;

    @observable onSaved = false;

    @observable sendMessageVisible = false;
    @observable messageToHost = '';


    @observable selfListings = [];
    @observable selfPhotoUrl = "";
    @observable selfSchool = "";
    @observable selfRating = 0;
    @observable selfName = "";
    @observable selfBio = "";
    @observable selfCoverUrl = "";
    @observable selfProfileLoaded = false;
    @observable onSelfProfile = false;

    @observable savedUserListingsIds = [];
    @observable profileUID = "";
    @observable userPhotoUrl = "";
    @observable userSchool = "";
    @observable userRating = 0;
    @observable userName = "";
    @observable userBio = "";
    @observable userCoverUrl = "";
    @observable profileLoaded = false;
    @observable onaProfile = false;


    @action
    async initSavedListingIds() {

    //  if(this.selectedSavedSchool == "" || this.selectedSavedSchool== this.selectedSchool){

      //  console.log(this.selectedSchool);

        let userID = await AsyncStorage.getItem('userID');
        var userSavedRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + this.selectedSchool);

        var saveArray = [];
        var that = this;

        userSavedRef.orderByChild("timeSaved").on('child_added', (child) => {
            if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
                saveArray.push(child.key);
                let index = that.listings.findIndex(listing => listing.key == child.key);
                let temp = that.listings.slice();
                temp[index].isSaved = true;
                that.listings = temp;
                that.savedIds = saveArray;
            }

        });

        userSavedRef.on('child_removed', (child) => {
            if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
               if(this.selectedSavedSchool == "" || this.selectedSavedSchool== this.selectedSchool){
                saveArray.splice(saveArray.indexOf(child.key), 1);
                let index = that.listings.findIndex(listing => listing.key == child.key);
                  console.log(this.selectedSchool);
                let temp = that.listings.slice();
                temp[index].isSaved = false;
                that.listings = temp;
                that.savedIds = saveArray;
              }
            }
        });
    //  }
    }

    @action
    async initSavedListingIdsSavedScreen() {
        let userID = await AsyncStorage.getItem('userID');
        var userSavedRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + this.selectedSavedSchool);
      //  console.log("saved:"+this.selectedSavedSchool);
        var saveArray = [];
        var that = this;

        userSavedRef.orderByChild("timeSaved").on('child_added', (child) => {
            if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
                saveArray.push(child.key);
                that.savedIdsSavedScreen = saveArray;
            }
        });

        userSavedRef.on('child_removed', (child) => {
            if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
                saveArray.splice(saveArray.indexOf(child.key), 1);
                that.savedIdsSavedScreen = saveArray;
                that.initSavedListings();

            }
        });

        this.initSavedListings();
    }



        @action
        async initSavedUserListingsIds(hostUID) {

            var userID = await AsyncStorage.getItem('userID');
            var userSavedRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + this.userSchool);

            var saveArray = [];
            var that = this;

            userSavedRef.orderByChild("hostUID").equalTo(hostUID).on('child_added', (child) => {
                if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
                    saveArray.push(child.key);

                    let index = that.userListings.findIndex(listing => listing.key == child.key);
                    let temp = that.userListings.slice();
                    temp[index].isSaved = true;
                    that.userListings = temp;


                    that.savedUserListingsIds = saveArray;
                }

            });

            userSavedRef.orderByChild("hostUID").equalTo(hostUID).on('child_removed', (child) => {
                if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
                    saveArray.splice(saveArray.indexOf(child.key), 1);
                    let index = that.userListings.findIndex(listing => listing.key == child.key);
                    let temp = that.userListings.slice();
                    temp[index].isSaved = false;
                    that.userListings = temp;

                    that.savedUserListingsIds = saveArray;
                }
            });



        }



@action handleSave(isSaved, key, school,listingImage, hostUID){
    if(isSaved){

      this.unSaveListing(key,school)
    }
    else{
        this.saveListing(key,school, listingImage, hostUID)
    }
  }


    @action
    async saveListing(key,school, listingImage, hostUID) {



        this.selectedIsSaved = true;
        var that = this;

        var d = new Date();
        var time = d.getTime();

        let userID = await AsyncStorage.getItem('userID');
        var userSavedRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school);
        var savedImagesRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school + '/Images');


        savedImagesRef.child(key).set({
            Uri: listingImage,
            timeSaved: time
        });


        userSavedRef.child(key).set({
            timeSaved: time,
            hostUID :hostUID
        });

        var savedListingsLength = this.savedIds.length;

        userSavedRef.update({
            Uri: listingImage,
            numberOfListings: savedListingsLength
        });

        this.initSavedSchools();

    }


    @action
    async unSaveListing(key, school) {

        let userID = await AsyncStorage.getItem('userID');

        var savedListingRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school + '/' + key);
        var schoolRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school);
        var userSavedRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school);
        var savedImageRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school + '/Images/' + key);

        savedListingRef.remove();
        savedImageRef.remove();

        this.selectedIsSaved = false;

        if(this.onSaved && this.savedIdsSavedScreen.length == 0){
          schoolRef.remove()
        }
        if(this.onaProfile && this.savedUserListingsIds.length == 0){

          schoolRef.remove();
        }
        if(this.savedIds.length == 0){
          schoolRef.remove();
        }

         else {
            //var savedListingsLength = !this.onSaved? this.savedIds.length : this.savedIdsSavedScreen.length;
            var savedListingsLength;
            if(this.onSaved){
              savedListingsLength = this.savedIdsSavedScreen.length;
            }
            else if (this.onaProfile){
              savedListingsLength = this.savedUserListingsIds.length;
            }
            else{
              savedListingsLength = this.savedIds.length
            }
            var savedImagesRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school + '/Images/');

            savedImagesRef.orderByChild('timeSaved').limitToLast(1).once('value', (snapshot) => {
                snapshot.forEach(child => {
                    userSavedRef.update({
                        Uri: child.val().Uri,
                        numberOfListings: savedListingsLength
                    });
                });

            });
            this.initSavedSchools();

        }

    }


    isSavedListing(isSaved) {
        if (isSaved) {
            return '#FF5A5F';
        } else {
            return 'rgba(59,68,75,.2)'
        }
    }

    @action
    async initSavedSchools() {

        let userID = await AsyncStorage.getItem('userID');
        var savedSchoolsRef = firebase.database().ref('Users/' + userID + '/SavedListings/');
        var that = this;

        var savedSchoolsArray = [];


        savedSchoolsRef.on('child_added', (child) => {

            savedSchoolsArray.push({
                schoolName: child.key,
                uri: child.val().Uri,
                numberOfListings: child.val().numberOfListings
            });

            this.savedSchools = savedSchoolsArray
        });

        savedSchoolsRef.on('child_removed', (child) => {
            savedSchoolsArray.splice(savedSchoolsArray.indexOf(child.key), 1);
            this.savedSchools = savedSchoolsArray
        });

    }


    @action
    async initSavedListings() {

        var savedListingsRef = firebase.database().ref('/Universities/' + this.selectedSavedSchool + '/Listings/');
        var that = this;
        var savedListingsArray = [];

        savedListingsRef.on('child_added', (child) => {

            let isSaved = false;

            if (this.savedIdsSavedScreen.includes(child.key)) {
                isSaved = true;

                savedListingsArray.push({
                    key: child.key,
                    listingUID: child.key,
                    title: child.val().Title,
                    description: child.val().Description,
                    space: child.val().Space,
                    school: child.val().School,
                    price: child.val().Price,
                    datePosted: child.val().datePosted,
                    hostUID: child.val().hostUID,
                    hostUri: child.val().hostUri,
                    uri: child.val().mainUri,
                    isSaved: isSaved
                });
            }

            savedListingsArray.sort((a, b) => this.savedIdsSavedScreen.indexOf(b.key) - this.savedIdsSavedScreen.indexOf(a.key));
            for (var i = 0; i < savedListingsArray.length; i++) {
                savedListingsArray[i].index = i;
            }
            this.savedListings = savedListingsArray;
            this.cardsEmpty = false;
        });

    }

    @action
    async initListings() {
      this.initSavedListingIds();

        var listingsRef = firebase.database().ref('/Universities/' + this.selectedSchool + '/Listings/');
        var that = this;
        var listingIndex = 0;
        var listingsArray = [];
        var savedListingsArray = [];

        listingsRef.orderByChild('datePosted').on('child_added', (child) => {
            let isSaved = false;

            if (this.savedIds.includes(child.key)) {
                isSaved = true;
            }

            listingsArray.push({
                index: listingIndex++,
                key: child.key,
                listingUID: child.key,
                title: child.val().Title,
                description: child.val().Description,
                space: child.val().Space,
                school: child.val().School,
                price: child.val().Price,
                datePosted: child.val().datePosted,
                hostUID: child.val().hostUID,
                hostUri: child.val().hostUri,
                uri: child.val().mainUri,
                isSaved: isSaved
            });

            this.listings = listingsArray;
            this.cardsEmpty = false;
        });
    }

    @action
    async initSelfProfile() {

      this.selfProfileLoaded = false;

      let userID = await AsyncStorage.getItem('userID');


        let userRef = firebase.database().ref('Users/'+userID+"/UserData/");

        await userRef.once('value',(snapshot)=>{
          this.selfName = "" + snapshot.val().firstName +" "+ snapshot.val().lastName,
          this.selfPhotoUrl = snapshot.val().profileUrl,
          this.selfSchool = snapshot.val().School,
          this.selfRating= snapshot.val().Rating,
          this.selfBio = snapshot.val().Bio,
          this.selfCoverUrl = snapshot.val().coverUrl
        })

        var listingsRef = firebase.database().ref('/Universities/' + this.selfSchool+ '/Listings/');
        var that = this;
        var listingIndex = 0;
        var listingsArray = [];

        await listingsRef.orderByChild('hostUID').equalTo(userID).once('value', (snap) => {

            snap.forEach((child) => {
              listingsArray.push({
                  index: listingIndex++,
                  key: child.key,
                  listingUID: child.key,
                  title: child.val().Title,
                  description: child.val().Description,
                  space: child.val().Space,
                  school: child.val().School,
                  price: child.val().Price,
                  datePosted: child.val().datePosted,
                  hostUID: child.val().hostUID,
                  hostUri: child.val().hostUri,
                  uri: child.val().mainUri,
                  isSaved: false,
                  onSelfProfile:true
                    });
                });
        });



        this.selfListings = listingsArray;
        this.selfProfileLoaded = true;

    }


    @action
    async initUserProfile(userID) {

      this.profileLoaded = false;

      this.profileUID = userID;

        let userRef = firebase.database().ref('Users/'+this.profileUID+"/UserData/");

        await userRef.once('value',(snapshot)=>{
          this.userName = "" + snapshot.val().firstName +" "+ snapshot.val().lastName,
          this.userPhotoUrl = snapshot.val().profileUrl,
          this.userSchool = snapshot.val().School,
          this.userRating= snapshot.val().Rating,
          this.userBio = snapshot.val().Bio,
          this.userCoverUrl = snapshot.val().coverUrl
        })

        this.initSavedUserListingsIds(userID);

        var listingsRef = firebase.database().ref('/Universities/' + this.userSchool+ '/Listings/');
        var that = this;
        var listingIndex = 0;
        var listingsArray = [];

        await listingsRef.orderByChild('hostUID').equalTo(userID).once('value', (snap) => {

            snap.forEach((child) => {
              listingsArray.push({
                  index: listingIndex++,
                  key: child.key,
                  listingUID: child.key,
                  title: child.val().Title,
                  description: child.val().Description,
                  space: child.val().Space,
                  school: child.val().School,
                  price: child.val().Price,
                  datePosted: child.val().datePosted,
                  hostUID: child.val().hostUID,
                  hostUri: child.val().hostUri,
                  uri: child.val().mainUri,
                  isSaved: false,
                //  onSelfProfile:true
                });
            });
    });
        this.userListings = listingsArray;
        this.profileLoaded = true;

    }




    async sendRequest(index) {

      var user = firebase.auth().currentUser;

        var d = new Date();
        var time = d.getTime();
        var requestsRef = firebase.database().ref('Requests/');

        let listingTitle = this.listings[index].title;
        let hostID = this.listings[index].hostUID;
        let key = this.listings[index].key;

        let userID = await AsyncStorage.getItem('userID');
        let userDisplayName = await AsyncStorage.getItem('userDisplayName');
        let userPhotoUrl = await AsyncStorage.getItem('userPhotoUrl');

        var newRequest = requestsRef.push();


        newRequest.set({
            key: key,
            timeSent: time,
            requestedTitle: listingTitle,
            senderName: userDisplayName,
            senderPhotoUri: userPhotoUrl,
            senderUID: userID,
            hostUID: hostID
        });
    }



    async sendMessageToHost() {


        let userID = await AsyncStorage.getItem('userID');
        let userName = await AsyncStorage.getItem('userDisplayName');
        userName = userName.split(' ').shift();
        var messagesRef = firebase.database().ref('Threads/');
        var hostMessage = messagesRef.push();

        var d = new Date();
        var time = d.getTime();

        var that = this;

        hostMessage.set({
            lastMessage: that.messageToHost,
            travellerUID: userID,
            travellerName: userName,
            hostUID: that.hostUid,
            listingUri: that.listingImages[0].uri,
            listingTitle: that.detailTitle,
            timeSent: time
        });

        this.sendMessage(hostMessage.key, time);

    }

    @action
    async sendMessage(key, time) {
        let userID = await AsyncStorage.getItem('userID');
        let userPhotoUrl = await AsyncStorage.getItem('userPhotoUrl');
        var newMessageRef = firebase.database().ref("Messages/" + key);

        var that = this;

        newMessageRef.push().set({
            message: that.messageToHost,
            senderUID: userID,
            senderUri: userPhotoUrl,
            timeSent: time
        })
        this.messageToHost = "";
    }



    @action
    initImages(key,school, listingImage, index) {

        this.detailIsLoaded = false;
        this.selectedIndex = index;
        this.listingImages = [];

        var imagesRef = firebase.database().ref('/Universities/' + school + '/ListingsDetails/' + key + '/Images/');

        var imagesArray = [];
        var that = this;

        imagesRef.orderByChild('Index').once('value', (snap) => {
            snap.forEach((child) => {
            imagesArray.push({
                uri: child.val().Uri,
                key: child.key
                });
            });

            this.listingImages = imagesArray;
            this.initListingDetail(key,school, listingImage);
            this.initTags(key,school);
        });

    }


    @action
    initListingDetail(key, school, listingImage) {
      //  console.log("here");
        //console.log(listingImage);


        this.detailUID = key;
        this.detailSchool = school;
        this.detailMainUri = listingImage;


        var userDetailRef = firebase.database().ref('/Universities/' + school + '/ListingsDetails/' + key);

        userDetailRef.once('value', (snapshot) => {
                this.hostUri = snapshot.val().hostUri,
                this.hostUid = snapshot.val().hostUID,
                this.hostName = snapshot.val().hostName,
                this.detailTitle = snapshot.val().Title,
                this.detailDescription = snapshot.val().Description,
                this.detailSpace = snapshot.val().Space

        });

    }

    @action
    previousListing(index) {
        var selectedArray;
        var newIndex;

        if (this.onSaved) {
            selectedArray = this.savedListings;
        } else {
            selectedArray = this.listings;
        }
        if (index - 1 < 0) {
            newIndex = selectedArray.length - 1;
        } else {
            newIndex = index - 1;
        }

        if (selectedArray.length != 0) {
          var newListing = selectedArray[newIndex];
          this.selectedIsSaved = newListing.isSaved;
          this.initImages(newListing.listingUID, newListing.school,newListing.uri, newListing.index);
        }

    }

    @action
    nextListing(index) {
      //console.log(index);
        var selectedArray;
        var newIndex;
        if (this.onSaved) {
            selectedArray = this.savedListings;
        } else {
            selectedArray = this.listings;
        }

        if (index + 1 > selectedArray.length - 1) {
            newIndex = 0;
        } else {
            newIndex = index + 1;
        }

        if (selectedArray.length != 0) {
            var newListing = selectedArray[newIndex];
            this.selectedIsSaved = newListing.isSaved;
            this.initImages(newListing.listingUID, newListing.school,newListing.uri, newListing.index);
        }

    }

    @action
    clearListing(nav) {
        this.selectedIsSaved = false;
        this.hostUid = "";
        this.hostName = "";
        this.hostTags = [];
        this.detailTitle = "";
        this.detailDescription = "";
        this.detailSpace = "";
        this.detailUID = "";
        this.detailSchool = "";
        this.detailMainUri = "";
        nav.goBack(null);
    }

    @action
    leaveSaved(nav) {
        this.hostUid = "";
        this.hostName = "";
        this.hostTags = [];
        this.detailTitle = "";
        this.detailDescription = "";
        this.detailSpace = "";
        this.savedIdsSavedScreen = [];
        this.onSaved = false;
        nav.goBack(null);
    }

    @action
    leaveProfile(nav){
    //  this.profileLoaded = false;
      this.profileUID = "";
      this.onaProfile = false;
      this.savedUserListingsIds = [];
      nav.goBack(null);
    }

    getEmoji(name) {
        var emoji;
        if (name == "Night Owl") {
            emoji = "night_with_stars";
        } else if (name == "Athlete") {
            emoji = "sports_medal";
        } else if (name == "Naughty") {
            emoji = "smiling_imp";
        } else if (name == "Frat Star") {
            emoji = "star";
        } else if (name == "Chef") {
            emoji = "fork_and_knife";
        } else if (name == "Bookworm") {
            emoji = "green_book";
        }

        return emoji;
    }

    getColor(name) {
        var color;
        if (name == "Night Owl") {
            color = "#111934";
        } else if (name == "Athlete") {
            color = "#FE424D";
        } else if (name == "Naughty") {
            color = "#291025";
        } else if (name == "Frat Star") {
            color = "#ffbf00";
        } else if (name == "Chef") {
            color = "#999999";
        } else if (name == "Bookworm") {
            color = "	#36802d";
        }

        return color;
    }

    @action
    initTags(key, school) {
        this.hostTags = [];


        var tagsRef = firebase.database().ref('/Universities/' + school + '/ListingsDetails/' + key + '/hostTags/');

        var tagsArray = [];
        var that = this;

        tagsRef.on('value', (snap) => {
            snap.forEach((child) => {
            tagsArray.push({
                name: child.val().Value,
                emoji: that.getEmoji(child.val().Value),
                color: that.getColor(child.val().Value)
            });
          });

            that.hostTags = tagsArray;
            that.detailIsLoaded = true;

        });

    }




    @action
    updateCards(index) {

        if (index + 1 < this.listings.length) {
            this.cardIndex = index + 1;
        }
        this.handleUnderlay(index);
    }

    @action handleUnderlay(index) {
        if (index + 1 == this.listings.length - 1) {
            this.noUnderlay = true;
        }
    }

    @action
    noMoreCards() {
        this.currentPrice = "";
        this.cardIndex = 0;
        this.cardsEmpty = true;
    }



}

export default new listingsStore();
