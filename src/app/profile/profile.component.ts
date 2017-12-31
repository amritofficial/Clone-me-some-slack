import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authState: any;
  displayName:string;
  constructor(public authService: AuthService, public userService: UserService) { }

  ngOnInit() {
    this.authState = this.authService.authState;
    console.log('AuthState' + this.authState.uid);
   
  }

  updateUser() {
    this.userService.updateUserDisplayName(this.displayName);
  }

}
