import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ChannelService {
    constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {}

    // updateChannelName(channelName: string) {
    //     this.afAuth.authState.subscribe(auth => {
    //         let path = `/channels/${auth.uid}`;
    //         let channelData = {
    //             name: channelName
    //         };
    //         this.db.object(path).update(channelData)
    //         .then(() => console.log('Successfully Updated Channel!'))
    //         .catch(error => console.log(error));
    //     });
        
    // }

}