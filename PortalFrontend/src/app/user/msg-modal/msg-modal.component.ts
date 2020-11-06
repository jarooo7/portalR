import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Message } from 'src/app/_models/Message';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/User.model';
import { AlertifyService } from 'src/app/_serwises/alertify/alertify.service';
import { AuthService } from 'src/app/_serwises/auth/auth.service';
import { UserService } from 'src/app/_serwises/user/user.service';

@Component({
  selector: 'app-msg-modal',
  templateUrl: './msg-modal.component.html',
  styleUrls: ['./msg-modal.component.scss']
})
export class MsgModalComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ReUser: User;
  messages: Message[] = [];
  pagination: Pagination = {
    currantPage: 1,
    itemPerPage: 6,
    totalItems: null,
    totalPages: null
  };
  currentPage = 1;
  flagLink = true;
  flagStart = true;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    public authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.messages = [];
    this.loadMessages();
    this.scrollToBottom();
  }


  loadMessages() {
    this.flagLink = true;
    this.userService.getMessageThread(this.authService.dekoded.nameid, this.ReUser.id,
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
        this.flagStart = true;
      }, error => {
        this.alertify.error(error);
      });
  }



  isYou(userIdForMsg: number) {
    return userIdForMsg == this.authService.dekoded.nameid;
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.flagStart) {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        this.flagStart = false;
      }
    } catch (err) { }
  }
  onScroll() {
    this.currentPage++;
    this.loadMessages();
  }
}
