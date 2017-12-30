import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
    private user: Observable<firebase.User>; //this defines the standard firebase user object to fetch user info directly from Firebase
    authState: any; //this is to hold the user information when he/she registers or logs in

    constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public router: Router) {
        this.user = afAuth.authState;
    }

    registerUser(email:string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((User) => {
           this.authState = User;
           this.storeUserData(email, password);
           console.log('Registered Returned Promise ' + User.uid); 
        }).catch(error => console.log(error));
    }

    loginUser(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((User) => {
            this.authState = User;
            console.log('Loggedin service Successful!');
        });
    }

    storeUserData(email, password) {
        const userId = this.currentUserId;
        console.log('Data: ' + email + password + ": " + userId);
        const path = `users/${userId}`;
        const data = {
            email: email,
            displayName: '',
            status: 'Online'
        }

        this.db.object(path).update(data)
        .catch(error => console.log('Error while updating: ' + error));
    }

    get currentUserId(): string {
       return this.authState !== null ? this.authState.uid : '';
    }
 
}