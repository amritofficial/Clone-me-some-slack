import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges, OnDestroy{
  message: string;
  channelId: any;
  messages: any;
  channelData: any;
  channelName: string;
  test: string;

  constructor(private messageService: MessageService, private db: AngularFireDatabase, public activeRoute: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.messageService.currentChannelId.subscribe(data => {
      // this.channelId = data;
      console.log("Behaviour: " + this.channelId);
      if(data === undefined || data === "") {
         this.channelId = this.activeRoute.snapshot.params['cid'];
      }
      else {
        this.channelId = data;
      }
      
      this.getChannelName(this.channelId);
      this.getMessages(this.channelId);
    });
  }

  ngOnChanges() {
    // this.channelId = this.activeRoute.snapshot.params['cid'];
    // this.getChannelName(this.channelId);
  }

  sendMessage() {
    console.log('Message Sent ' + this.message);
    this.channelId = this.activeRoute.snapshot.params['cid'];
    this.messageService.storeMessage(this.channelId, this.message);
    this.message = '';
    console.log('ChannelId ' + this.channelId);
    // this.getMessages();
  }

  getMessages(channelId: any) {
    console.log("From getMessages " + this.channelId);
    const path = `/${channelId}/channelMessages`;
    console.log('From getM ' + path);
    this.db.list(path).valueChanges().subscribe(data => {
      this.messages = data;
      console.log(data);
    });
  }

  getChannelName(channelId: string) {
    console.log('ChannelId being passed: ' + channelId);
    const path = `/channels/${channelId}`;
    this.db.object(path).valueChanges()
    .subscribe(data => {
      this.channelData = data;
      this.channelName = this.channelData.name;
      console.log(":::: " + this.channelName);
    });
  }

  ngOnDestroy() {
  }

}
