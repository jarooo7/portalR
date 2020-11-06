import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../_models/Message';
import { Pagination, PaginationResult } from '../_models/pagination';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { AuthService } from '../_serwises/auth/auth.service';
import { UserService } from '../_serwises/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ReId: number;
  @Input('recipientId')
  set in(val) {
    this.currentPage = 1;
    this.messages = [];
    this.loadMessages(val);
    this.scrollToBottom();
  }
  messages: Message[] = [];
  pagination: Pagination = {
    currantPage: 1,
    itemPerPage: 6,
    totalItems: null,
    totalPages: null
  };
  currentPage = 1;
  flagLink = true;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private alertify: AlertifyService) {
  }

  loadMessages(re: number) {
    this.flagLink = true;
    this.ReId = re;
    this.userService.getMessageThread(this.authService.dekoded.nameid, re,
      this.currentPage,
      (this.pagination === undefined || this.pagination.itemPerPage === undefined) ? 6 : this.pagination.itemPerPage)
      .subscribe((res: PaginationResult<Message[]>) => {

        if (res.result.length < 6) {
          this.flagLink = false;
        }
        console.log(res.result);

        const temp = res.result.reverse();
        Array.prototype.push.apply(temp, this.messages);
        this.messages = temp;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currantPage = event.page;
    this.loadMessages(this.ReId);
  }

  isYou(userIdForMsg: number) {
    return userIdForMsg == this.authService.dekoded.nameid;
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  onScroll() {
    this.currentPage++;
    this.loadMessages(this.ReId);
  }
}
