import {observable,computed,action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import {AsyncStorage} from 'react-native';
import * as firebase from 'firebase';
import authenticationStore from '../Stores/authenticationStore.js';


class inboxStore {

    @observable requests = [];
    @observable threads = [];
    @observable messagesLoaded = false;
    @observable messages = [];
    @observable messageText = "";
    @observable selectedThread;
    @observable canLoadMoreMessages = true;


    getDaysBetween(time1, time2) {
        var oneDay = 1000 * 60 * 60 * 24;
        var difference = Math.abs(time1 - time2);
        return Math.round(difference / oneDay)
    }

    formatTime(time, currentTime) {
        var today = new Date(time);

        var daysBetween = this.getDaysBetween(time, currentTime);
        var options;

        if ((daysBetween >= 1) && (daysBetween < 7)) {
            var res = today.toLocaleTimeString([], {
                weekday: 'long'
            });
            return res.split(' ').shift();
        } else if (daysBetween >= 7) {
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear().toString().slice(2);

            return month + '/' + day + "/" + year;
        } else {
            return today.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

    }

    removeRequest(key) {
        var requestRef = firebase.database().ref('Requests/' + key);
        requestRef.remove();
        this.initRequests();
    }

    @action
    async initRequests() {
        var requestsRef = firebase.database().ref('Requests/');
        var that = this;

        let requestsArray = [];
        let userID = await AsyncStorage.getItem('userID');

        requestsRef.orderByChild("hostUID").equalTo(userID).on('child_added', (child) => {
            requestsArray.push({
                key: child.key,
                timeSent: child.val().timeSent,
                title: child.val().requestedTitle,
                senderName: child.val().senderName,
                senderUri: child.val().senderPhotoUri,
                senderUID: child.val().senderUID,
                hostUID: child.val().hostUID,
            });

            requestsArray.sort((a, b) => b.timeSent - a.timeSent);
            that.requests = requestsArray;
            that.noRequests = false;
        });

        requestsRef.orderByChild("hostUID").equalTo(userID).on('child_removed', (child) => {
            requestsArray.splice(requestsArray.indexOf(child.key), 1);
            requestsArray.sort((a, b) => b.timeSent - a.timeSent);
            that.requests = requestsArray;
            that.noRequests = false;
        });
    }

    @action
    async initThreads() {
        var threadsRef = firebase.database().ref('Threads/');
        var that = this;

        let threadsArray = [];
        let userID = await AsyncStorage.getItem('userID');


        threadsRef.orderByChild("travellerUID").equalTo(userID).on('child_added', (child) => {
            threadsArray.push({
                key: child.key,
                timeSent: child.val().timeSent,
                lastMessage: child.val().lastMessage,
                travellerName: child.val().travellerName,
                listingTitle: child.val().listingTitle,
                uri: child.val().listingUri
            });

            threadsArray.sort((a, b) => b.timeSent - a.timeSent);
            that.threads = threadsArray;
            that.noRequests = false;

        });

        threadsRef.orderByChild("travellerUID").equalTo(userID).on('child_changed', (child) => {
            let threadIndex = this.threads.findIndex(thread => thread.key == child.key);
            let changedThread = child.val();
            that.threads[threadIndex].lastMessage = changedThread.lastMessage;
            that.threads[threadIndex].timeSent = changedThread.timeSent;
            that.threads = that.threads.sort((a, b) => b.timeSent - a.timeSent);

        });
    }


    @action
    async initMessages() {

        var messagesRef = firebase.database().ref('Messages/' + this.selectedThread);
        var that = this;

        let messagesArray = [];
        let userID = await AsyncStorage.getItem('userID');
        let userPhotoUrl = await AsyncStorage.getItem('userPhotoUrl');

        messagesRef.orderByChild("timeSent").limitToLast(25).on('child_added', (child) => {
            let isUser = false;
            if (child.val().senderUID == userID) {
                isUser = true;
            }

            messagesArray.push({
                key: child.key,
                timeSent: child.val().timeSent,
                message: child.val().message,
                uri: child.val().senderUri,
                senderUID: child.val().senderUID,
                isUser: isUser,
                showTime: true,
                showAvatar: true
            });

            let messageIndex = messagesArray.findIndex(message => message.key == child.key);

            if (messageIndex - 1 >= 0 && messagesArray[messageIndex - 1].senderUID == child.val().senderUID) {
                if (this.getDaysBetween(child.val().timeSent, messagesArray[messageIndex - 1].timeSent) < 1) {
                    messagesArray[messageIndex - 1].showTime = false;
                    messagesArray[messageIndex - 1].showAvatar = false;
                }
            }
            that.messages = messagesArray;
            that.messages[that.messages.length-1].isLast = true;
        })

        await messagesRef.once('value', () => {
            that.messagesLoaded = true;
        })
    }


    @action
    async getMoreMessages() {

        var that = this;

        var messagesRef = firebase.database().ref('Messages/' + this.selectedThread);
        let messagesArray = [];
        let userID = await AsyncStorage.getItem('userID');
        let userPhotoUrl = await AsyncStorage.getItem('userPhotoUrl');
        var dataSize = 0;

        var startingTime = this.messages[0].timeSent;
        var startingKey = this.messages[0].key;

        messagesRef.orderByChild("timeSent").endAt(startingTime).limitToLast(26).once('value', (snap) => {
            if (snap.val() == null) {
                that.canLoadMoreMessages = false;
            } else {

                snap.forEach((child) => {
                    if (child.key != startingKey) {
                        dataSize++;
                        let isUser = false;
                        if (child.val().senderUID == userID) {
                            isUser = true;
                        }

                        messagesArray.push({
                            key: child.key,
                            timeSent: child.val().timeSent,
                            message: child.val().message,
                            uri: child.val().senderUri,
                            senderUID: child.val().senderUID,
                            isUser: isUser,
                            showTime: true,
                            showAvatar: true,
                            isLast:false
                        });

                        let messageIndex = messagesArray.findIndex(message => message.key == child.key);

                        if (messageIndex - 1 >= 0 && messagesArray[messageIndex - 1].senderUID == child.val().senderUID) {
                            if (that.getDaysBetween(child.val().timeSent, messagesArray[messageIndex - 1].timeSent) < 1) {
                                messagesArray[messageIndex - 1].showTime = false;
                                messagesArray[messageIndex - 1].showAvatar = false;
                            }
                        }

                    }
                });

                if(dataSize==0){
                  that.canLoadMoreMessages = false;
                };

                let lastNewMessage = messagesArray[messagesArray.length - 1];
                if (lastNewMessage && that.getDaysBetween(lastNewMessage.timeSent, that.messages[0].timeSent) < 1) {
                    lastNewMessage.showTime = false;
                    lastNewMessage.showAvatar = false;
                }
                that.messages.unshift(...messagesArray.slice());
                that.messages[that.messages.length-1].isLast = true;
            }
        })
    }




    @action
    async sendMessage() {
        let userID = await AsyncStorage.getItem('userID');
        let userPhotoUrl = await AsyncStorage.getItem('userPhotoUrl');
        var newMessageRef = firebase.database().ref("Messages/" + this.selectedThread);
        var threadRef = firebase.database().ref("Threads/" + this.selectedThread);

        var d = new Date();
        var time = d.getTime();

        var that = this;

        newMessageRef.push().set({
            message: that.messageText,
            senderUID: userID,
            senderUri: userPhotoUrl,
            timeSent: time
        });

        threadRef.update({
            lastMessage: that.messageText,
            timeSent: time
        });

        this.messageText = "";
    }

    @action
    leaveMessages(navigation) {
        this.messagesLoaded = false;
        this.canLoadMoreMessages = true;
        navigation.goBack(null);
    }

}

export default new inboxStore();
