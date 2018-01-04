import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { AngularFireList, AngularFireObject } from "angularfire2/database/interfaces";
import { userModel } from "../models/user.model";
import { AuthService } from "./auth.service";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class UserService implements OnInit{
    public authState: any;
    userData: AngularFireList<any[]>;
    constructor(public db:AngularFireDatabase, public authService: AuthService, public afAuth: AngularFireAuth, public router: Router) {
        this.authState = this.afAuth.authState;
        
    }

    // getAllUsers(){
    //     return this.afDatabase.object(`users/${this.authService.currentUserId}`);
    // }

    getAllUsers() {
        return this.db.list('/users').valueChanges();
    }

    ngOnInit() {
        this.userData = this.db.list('/users/0FkH93j0rSV5PvbXw2Vc7EHzxgx1');
        console.log()
    }

    updateUserDisplayName(dName: string) {
        // firebase.auth().onAuthStateChanged(function(user) {
        //     if(user) {
        //         this.authState = user;
        //         console.log("::::::: " + this.authState.uid + this.authState.email);
        //         // this.db.object(`/users/${this.authState.uid}`)
        //         // .set({uid: this.authState.uid, email:this.authState.email, displayName:"AMRITTEST", status:'offline'})
        //         // .catch(error => console.log(error));
        //     }
        //     else {
        //         console.log('No user is out ');
        //     }
        // });

        // Working auth 
        this.afAuth.authState.subscribe(auth => {
            if(auth) {
            this.authState = auth;
            console.log("::::::: " + this.authState.uid + this.authState.email);
            this.db.object(`/users/${this.authState.uid}`)
            .set({uid: this.authState.uid, email:this.authState.email, displayName:dName, status:'online'})
            .then(() => this.router.navigate(['chatRoom/channels']))
            .catch(error => console.log(error));
            }
            else {
                console.log('User is not logged in');
            }
        });
        
    }

}