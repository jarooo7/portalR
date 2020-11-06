
import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/Message';
import { Pagination, PaginationResult } from '../_models/pagination';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { AuthService } from '../_serwises/auth/auth.service';
import { UserService } from '../_serwises/user/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'panel';
  flagaOutbox = false;
  recipientId: number;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
      this.recipientId = data.messages.result[0].senderId == this.authService.dekoded.nameid ?
        data.messages.result[0].recipientId :
        data.messages.result[0].senderId;
    });
  }


  loadMessages() {
    this.userService.getMessages(this.authService.dekoded.nameid, this.pagination.currantPage,
      this.pagination.itemPerPage, this.messageContainer)
      .subscribe((res: PaginationResult<Message[]>) => {
        console.log(res.result);
        Array.prototype.push.apply(this.messages,res.result);
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currantPage = event.page;
    this.loadMessages();
  }

  changeChat(id: number) {
    this.recipientId = id;
  }

  onScroll() {
    console.log('scroll');
    this.pagination.currantPage++;
    this.loadMessages();
  }
}
