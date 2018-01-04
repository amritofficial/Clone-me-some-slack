import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { ChannelService } from "../../../services/channel.service";
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';
import { MessageComponent } from '../../message/message.component';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { userModel } from "../../../models/user.model";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels: any[];
  data: any[];
  users: any[];
  authId: string; // It's the ID of the current logged in user

  constructor(public db: AngularFireDatabase, 
              public channelService: ChannelService, 
              public router: Router, 
              public messageService: MessageService,
              private authService: AuthService,
              private userService: UserService) { 
    
  }
  selectedIndex: number;
  selectedIndexUser: number;

  newMessage(channelId: any) {
    this.messageService.changeMessage(channelId)
  }

  sendUser2Id(user2Id: any) {
    this.messageService.getUser2Id(user2Id);
  }

  ngOnInit() {
    this.displayData();
    this.getUsers();
    this.authId = this.authService.currentUserId;
    console.log('UserId1 ' + this.authId);
  }

  displayData() {
    // this.users = this.channelService.getChannels();
    this.db.list('/channels').valueChanges().subscribe(data => {
      this.channels = data;
      console.log(data);
    });
  }

  selectedItem(index, channelId: any):void {
    this.selectedIndex = index;
    console.log('ID: ' + channelId + " " +  this.channels[index].name);
    this.newMessage(this.channels[index].channelId);
    // this.getChannelId(this.channels[index].name);
  }

  selectedUserItem(index, user2Id: string): void {
    this.selectedIndexUser = index;
    console.log('UID: ' + user2Id + " " + this.users[index].uid);
    this.sendUser2Id(user2Id);
  }

  getChannelId(channelName: string) { 
    let data: any;
    data =  this.db.object(`/channels`);
    console.log('Channel Id ' + data.channelId);
  }
  
  // routeMe() {  
    // this.router.navigate(['/chatRoom/channel/message', {outlets: {'auxchild': [MessageComponent]}}]);
    // This works
    // this.router.navigate(['/chatRoom/channel/message']);
  // }

  getUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users[0].displayName);
    });
  }

  logoutUser() {
    this.authService.logout();
  }

}