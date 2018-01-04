import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { ActivatedRoute } from "@angular/router";
import * as firebase from 'firebase'; 
import { messageModel } from "../models/message.model";
import { userModel } from "../models/user.model";

@Injectable()
export class MessageService {
    authState: any;
    userData: any;
    channelId: string;
    message: string;
    messages: AngularFireList<messageModel[]>;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, public activeRoute: ActivatedRoute) {
        this.afAuth.authState.subscribe(auth => {
            if(auth !== undefined && auth !== null) {
                this.authState = auth;
            }
        });
    }

    // sendMessage() {
        
    // }

    storeMessage(channelId: any, message:string){
        console.log("Auth State " + this.authState.uid);
        this.getUserData().subscribe(data => {
            this.userData = data;
            console.log("data : " + this.userData.displayName);

            var newPostKey = firebase.database().ref().child('channelMessages').push().key;
            let path = `${channelId}/channelMessages/${newPostKey}`;

            const timeStamp:any = firebase.database.ServerValue.TIMESTAMP;

            let messageData: messageModel = {
                messageId: newPostKey,
                uid: this.authState.uid,
                userName: this.userData.displayName,
                message: message,
                timeSent: timeStamp
            }

            this.db.object(path).update(messageData)
            .then(() => console.log('Message Sent'))
            .catch(error => console.log("Error Message not sent " + error));
        }); 
    }

    // this will return a promise that a user would subscribe to get data
    getUserData() {
        const path = `/users/${this.authState.uid}`;
        return this.db.object(path).valueChanges();
    }
}