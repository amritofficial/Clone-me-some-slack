import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: string;
  channelId: number;
  constructor(private messageService: MessageService, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  sendMessage() {
    console.log('Message Sent ' + this.message);
    this.channelId = this.activeRoute.snapshot.params['cid'];
    this.messageService.storeMessage(this.channelId, this.message);
    this.message = '';
    console.log('ChannelId ' + this.channelId);
  }

}
