import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { Message, SendMsg } from '../_models/Message';
import { Pagination, PaginationResult } from '../_models/pagination';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { AuthService } from '../_serwises/auth/auth.service';
import { UserService } from '../_serwises/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
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
  messageForm: FormGroup;
  currentPage = 1;
  flagLink = true;
  isStart=true;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
    ) {
      
  }
  ngOnInit(): void {
    this.messageForm=this.fb.group( {content: ['', Validators.required]})
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
        if(this.isStart){
          var autoSaveInterval = setInterval( ()=>{
            if(this.ReId!==null&&this.ReId!==undefined){
              this.UpdateMsg();
            }
          },15000);
          this.isStart=false;
        }

        const temp = res.result.reverse();

         Array.prototype.push.apply(temp, this.messages);
        this.messages = temp;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }




  UpdateMsg() {
    this.flagLink = true;
    this.userService.getMessageThread(this.authService.dekoded.nameid, this.ReId,
      1,
      (this.pagination === undefined || this.pagination.itemPerPage === undefined) ? 6 : this.pagination.itemPerPage)
      .subscribe((res: PaginationResult<Message[]>) => {

        if (res.result.length < 6) {
          this.flagLink = false;
        }
        const temp = res.result.reverse();
        if(this.messages.length!==0){
          if(this.messages[this.messages.length-1].id ===temp[temp.length-1].id){
            return;
          }
        }
        temp.forEach(x=>{
          var flag = true;
          this.messages.forEach(
            y=>{
              if(x.id===y.id){
                flag=false
              }
            }
          )
          if(flag){
            this.messages.push(x);
          }
        })
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

  sendMsg(){
    var msg :SendMsg={
      content:this.messageForm.get('content').value,
      recipientId: this.ReId
    }
    this.userService.sendMessage(this.authService.dekoded.nameid,msg).subscribe(
      ()=>{
        this.alertify.message('Wiadomość wysłana');
        this.UpdateMsg();
      }, error => {
        this.alertify.error(error);}
    )
  }
}
