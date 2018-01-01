import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { ChannelService } from "../../../services/channel.service";
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels: any[];
  data: any[];
  constructor(public db: AngularFireDatabase, public channelService: ChannelService) { 
    
  }
  selectedIndex: number;

  ngOnInit() {
    this.displayData();
  }

  displayData() {
    // this.users = this.channelService.getChannels();
    this.db.list('/channels').valueChanges().subscribe(data => {
      this.channels = data;
      console.log(data);
    });
  }

  selectedItem(index):void {
    this.selectedIndex = index;
}

}