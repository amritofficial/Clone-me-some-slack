import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { userModel } from "../models/user.model";

import 'rxjs/add/operator/take';

@Injectable()
export class AuthService implements CanActivate{
    private user: Observable<firebase.User>; //this defines the standard firebase user object to fetch user info directly from Firebase
    authState: any; //this is to hold the user information when he/she registers or logs in
    private userData: userModel;
    status: string = 'online';

    loggedin: boolean;

    constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public router: Router) {
        this.user = afAuth.authState;
    }

    registerUser(email:string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((User) => {
           this.authState = User;
           this.storeUserData(email, password);
           this.loginUser(email, password);
           console.log('Registered Returned Promise ' + User.uid); 
        }).catch(error => console.log(error));
    }

    loginUser(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((User) => {
            this.authState = User;
            this.status = 'online';
            this.setUserStatus(this.status);
            console.log('Loggedin service Successful!');
        });
    }

    storeUserData(email, password) {
        const userId = this.currentUserId;
        console.log('Data: ' + email + password + ": " + userId);
        const path = `users/${userId}`;
        this.userData = {
            uid: userId,
            displayName: email,
            email: email,
            status: 'online'
        }

        // const data = {
        //     email: email,
        //     displayName: email,
        //     status: 'Online'
        // }

        this.db.object(path).update(this.userData)
        .catch(error => console.log('Error while updating: ' + error));
    }

    get currentUserId(): string {
       return this.authState !== null ? this.authState.uid : '';
    }

    canActivate() {
        if(this.authState){
            return true;
        }
        this.router.navigate(['/home']);
    }

    // canActivate(): Promise<boolean> {
    //     let self = this;
    //      return this.afAuth.authState.toPromise().then(auth => {
    //           if  (auth)  { this.loggedin = true; }
    //           else { this.loggedin = false; }
    //           self.router.navigate(['/home']);
    //          return this.loggedin;
    //      });
    //  }

    setUserStatus(status: string) {
        const path = `users/${this.currentUserId}`;
        const data = {
            status: status
        }

        this.db.object(path).update(data)
        .then(() => console.log('Youre Online!'))
        .catch(error => console.log(error));
    }

    logout() {
        const path = `users/${this.currentUserId}`;
        const data = {
            status: 'offline'
        }
        this.db.object(path).update(data)
        .then(() => console.log('You Logged Out'))
        .catch(error => console.log(error));
        this.afAuth.auth.signOut();
        this.router.navigate(['home']);
    }
 
}