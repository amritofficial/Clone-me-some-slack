import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent implements OnInit {
  message: string;
  user2Id: any;
  constructor(private authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.currentUser2Id.subscribe(data => {
      this.user2Id = data;
      console.log("The Second User Id " + this.user2Id);
    });
  }

  sendMessage() {
    this.messageService.storeDirectMessage(this.user2Id, this.message);
    this.message = '';
    // this.messageService.storeDirectMessage(user1, this.message);
  }
}
