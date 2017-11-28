import {observable, computed, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import * as firebase from 'firebase';
import {AsyncStorage} from 'react-native';

import authenticationStore from '../Stores/authenticationStore.js';


class listingsStore {
    @observable listings = [];
    @observable savedIds = [];
    @observable savedIdsSavedScreen = [];
    @observable listingImages = [];
    @observable savedListings = [];
    @observable hostTags = [];

    @observable cardIndex = 0;
    @observable cardsEmpty = true;

    @observable noUnderlay = false;

    @observable selectedSchool = 'University of Delaware';

    @observable view = "List";

    @observable selectedSavedSchool = "";
    @observable savedSchools = [];

    @observable selectedIndex;
    @observable hostUri;
    @observable hostUid = "";
    @observable hostName = "";
    @observable detailTitle = "";
    @observable detailDescription = "";
    @observable detailSpace = "";
    @observable selectedIsSaved = false;
    @observable detailIsLoaded = false;



    @observable onSaved = false;
    @observable sendMessageVisible = false;
    @observable messageToHost = '';


    @action
    async initSavedListingIds() {
        let userID = await AsyncStorage.getItem('userID');
        var userSavedRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + this.selectedSchool);

        var saveArray = [];
        var that = this;

        userSavedRef.orderByChild("timeSaved").on('child_added', (child) => {
            if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
                saveArray.push(child.key);
                that.savedIds = saveArray;
                this.initListings();
            }

        });

        userSavedRef.on('child_removed', (child) => {
            if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
                saveArray.splice(saveArray.indexOf(child.key), 1);
                that.savedIds = saveArray;
                this.initListings();
            }
        });


        this.initListings();
    }

    @action
    async initSavedListingIdsSavedScreen() {
        let userID = await AsyncStorage.getItem('userID');
        var userSavedRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + this.selectedSavedSchool);

        var saveArray = [];
        var that = this;

        userSavedRef.orderByChild("timeSaved").on('child_added', (child) => {
            if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
                saveArray.push(child.key);
                that.savedIdsSavedScreen = saveArray;
                this.initSavedListings();
            }
        });

        userSavedRef.on('child_removed', (child) => {
            if ((child.key != "Uri") && (child.key != "numberOfListings") && (child.key != "Images")) {
                saveArray.splice(saveArray.indexOf(child.key), 1);
                that.savedIdsSavedScreen = saveArray;
                this.initSavedListings();
            }
        });

        this.initSavedListings();
    }




    @action
    handleSave(index) {
        if ((this.onSaved) && (this.savedListings[index].isSaved)) {
            this.unSaveListing(index);
        } else if (this.listings[index].isSaved) {
            this.unSaveListing(index);
        } else {
            this.saveListing(index);
        }
    }



    @action
    async saveListing(index) {

        this.selectedIsSaved = true;
        var that = this;

        var d = new Date();
        var time = d.getTime();

        let userID = await AsyncStorage.getItem('userID');
        var listingImage = this.listings[index].uri;
        var userSavedRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + this.selectedSchool);
        var savedImagesRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + this.selectedSchool + '/Images');


        savedImagesRef.child(this.listings[index].key).set({
            Uri: listingImage,
            timeSaved: time
        });


        userSavedRef.child(this.listings[index].key).set({
            timeSaved: time
        });

        var savedListingsLength = this.savedIds.length;

        userSavedRef.update({
            Uri: listingImage,
            numberOfListings: savedListingsLength
        });

        this.initSavedSchools();

    }


    @action
    async unSaveListing(index) {
        let userID = await AsyncStorage.getItem('userID');

        var key;
        var school;
        var listingImage;
        if (this.onSaved) {
            key = this.savedListings[index].key;
            school = this.selectedSavedSchool;
        } else {
            key = this.listings[index].key;
            school = this.selectedSchool;
        }

        var savedListingRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school + '/' + key);
        var schoolRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school);
        var userSavedRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + school);
        var savedImageRef = firebase.database().ref('Users/' + userID + '/SavedListings/' + this.selectedSchool + '/Images/' + key);

        savedListingRef.remove();
        savedImageRef.remove();

        if (index == this.selectedIndex) {
            this.selectedIsSaved = false;
        }

        if (this.savedIds.length == 0) {
            schoolRef.remove();
        } else {
            var savedListingsLength = this.savedIds.length;
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
            senderID: userID,
            senderUri: userPhotoUrl,
            timeSent: time
        })
        this.messageToHost = "";
    }



    @action
    initImages(index) {


        this.detailIsLoaded = false;
        this.selectedIndex = index;
        this.listingImages = [];

        var key;
        var school;
        if (this.onSaved) {
            key = this.savedListings[this.selectedIndex].key;
            school = this.selectedSavedSchool;
        } else {
            key = this.listings[this.selectedIndex].key;
            school = this.selectedSchool;
        }



        var imagesRef = firebase.database().ref('/Universities/' + school + '/ListingsDetails/' + key + '/Images/');

        var imagesArray = [];
        var that = this;

        imagesRef.orderByChild('Index').on('child_added', (child) => {

            imagesArray.push({
                uri: child.val().Uri,
                key: child.key
            });

            this.listingImages = imagesArray;
            this.initListingDetail();
            this.initTags();
        });

    }


    @action
    initListingDetail() {
        var key;
        var school;
        if (this.onSaved) {

            key = this.savedListings[this.selectedIndex].key;
            school = this.selectedSavedSchool;
        } else {
            key = this.listings[this.selectedIndex].key;
            school = this.selectedSchool;
        }

        var userDetailRef = firebase.database().ref('/Universities/' + school + '/ListingsDetails/' + key);

        userDetailRef.on('value', (snapshot) => {
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
            this.selectedIsSaved = selectedArray[newIndex].isSaved;
            this.initImages(newIndex);
        }

    }

    @action
    nextListing(index) {
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
            this.selectedIsSaved = selectedArray[newIndex].isSaved;
            this.initImages(newIndex);
        }

    }

    @action
    clearListing(nav) {
        this.hostUri = "";
        this.hostUid = "";
        this.hostName = "";
        this.hostTags = [];
        this.detailTitle = "";
        this.detailDescription = "";
        this.detailSpace = "";
        nav.goBack(null);
    }

    @action
    leaveSaved(nav) {
        this.hostUri = "";
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
    initTags() {
        this.hostTags = [];

        var key;
        var school;
        if (this.onSaved) {
            key = this.savedListings[this.selectedIndex].key;
            school = this.selectedSavedSchool;
        } else {
            key = this.listings[this.selectedIndex].key;
            school = this.selectedSchool;
        }


        var tagsRef = firebase.database().ref('/Universities/' + school + '/ListingsDetails/' + key + '/hostTags/');

        var tagsArray = [];
        var that = this;

        tagsRef.on('child_added', (child) => {

            tagsArray.push({
                name: child.val().Value,
                emoji: that.getEmoji(child.val().Value),
                color: that.getColor(child.val().Value)
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
