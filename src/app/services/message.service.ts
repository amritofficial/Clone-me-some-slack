import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { ActivatedRoute } from "@angular/router";
import * as firebase from 'firebase'; 
import { messageModel } from "../models/message.model";
import { userModel } from "../models/user.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class MessageService {
    authState: any;
    userData: any;
    channelId: string;
    message: string;
    messages: AngularFireList<messageModel[]>;
    messagePath: string;

    // The use of Behaiviour subject is to get data from Sibling to a Sibling
    private channelIdSource = new BehaviorSubject<string>("");
    currentChannelId = this.channelIdSource.asObservable();

    changeMessage(channelId: any) {
        this.channelIdSource.next(channelId);
    }

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

    // Below are the functions representing the direct message working
    private user2IdSource = new BehaviorSubject<string>("");
    currentUser2Id = this.user2IdSource.asObservable();
    
    getUser2Id(user2Id: any) {
        this.user2IdSource.next(user2Id);
    }

    storeDirectMessage(user2Id: any, message: string) {
        this.afAuth.authState.subscribe(users => {
            // var newPostKey = firebase.database().ref().child('userMessages').push().key;
            const timeStamp:any = firebase.database.ServerValue.TIMESTAMP;
           
            let path: string = this.getPath(this.authState.uid, user2Id);
            console.log('This is the path ' + path);

            
            
            this.getUserData().subscribe(userData => {
                this.userData = userData;
                console.log('The user display name ' + this.userData.displayName);

                // let data = {
                //     uid: this.authState.uid,
                //     displayName: this.userData.displayName,
                //     message: message,
                //     timeStamp: timeStamp
                // }

                let messageData: messageModel = {
                    messageId: '',
                    uid: this.authState.uid,
                    userName: this.userData.displayName,
                    message: message,
                    timeSent: timeStamp
                }

                this.db.object(path).update(messageData)
                .then(() => console.log('Direct Message Sent!'))
                .catch((error) => console.log(error));
                console.log('Direct Message from a service ' + message);
            });
            
        }); 
    }

    // This method finds a difference between two ids and builds a path off of the ids
    // provided by the method that would store data into the database and build the node using
    // this path
    getPath(user1Id: any, user2Id: any) {
        let path;
        var newPostKey = firebase.database().ref().child('userMessages').push().key;

            const timeStamp:any = firebase.database.ServerValue.TIMESTAMP
           
            if(user1Id < user2Id) {
                console.log('User2Id is greater');
                path = 'userMessages/'+user2Id + '/' + user1Id + '/' + newPostKey;
                return path;
            }
            else if(user1Id > user2Id) {
                console.log('this.authstate.uid is greater');
                path = 'userMessages/' + user1Id + '/' + user2Id + '/' + newPostKey;
                return path;
            }
            else if(user1Id === user2Id) {
                // console.log('They both are equal');
                path = 'userMessages/' + user1Id + '/' + user2Id + '/' + newPostKey;
                return path;
            }
    }
}