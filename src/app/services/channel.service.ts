import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ChannelService {
    constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {}

    updateChannelName(channelName: string) {
        this.afAuth.authState.subscribe(auth => {
            let path = `/channels`;
            let channelData = {
                name: channelName
            };

            const items = this.db.list('channels');
            items.push(channelData)
            .then(() => console.log("Successfully Updated!"));
            // this.db.object(path).update(channelData)
            // .then(() => console.log('Successfully Updated Channel!'))
            // .catch(error => console.log(error));
        });
    }

    getChannels() {
        return this.db.list('/channels');
    }

}