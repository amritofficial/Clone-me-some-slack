import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

@Injectable()
export class ChannelService {
    constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public router: Router) {}

    updateChannelName(channelName: string) {
        this.afAuth.authState.subscribe(auth => {
            var newPostKey = firebase.database().ref().child('channels').push().key;
            let path = `/channels/${newPostKey}`;
            let channelData = {
                channelId: newPostKey,
                name: channelName
            };
            
            // items.push(channelData).then((item) =>{
            //     console.log("Item " + item.key);
            // });

            this.db.object(path).update(channelData)
            .then(() => console.log('Channel Stored')).catch(error => console.log("Error Occured " + error));
            // this.db.object(path).update(channelData)
            // .then(() => console.log('Successfully Updated Channel!'))
            // .catch(error => console.log(error));
        });
    }

    getChannels() {
        return this.db.list('/channels');
    }

}