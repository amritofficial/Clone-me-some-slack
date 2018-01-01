import { Component, OnInit } from '@angular/core';
import { ChannelService } from "../../services/channel.service";

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {

  channelName: string;
  constructor() { }

  ngOnInit() {
  }

  updateChannel() {
    console.log('Channel Name::: ' + this.channelName);
  }

}
