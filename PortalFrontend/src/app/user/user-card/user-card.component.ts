import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/User.model';
import { AlertifyService } from 'src/app/_serwises/alertify/alertify.service';
import { AuthService } from 'src/app/_serwises/auth/auth.service';
import { UserService } from 'src/app/_serwises/user/user.service';
import { MsgModalComponent } from '../msg-modal/msg-modal.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  bsModalRef: BsModalRef;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private modalService: BsModalService
     ) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.dekoded.nameid, id)
          .subscribe(data => {
            this.alertify.success('Polubiłeś: ' + this.user.userName);
          }, error => {
            this.alertify.error(error);
          });
  }

  openMsg() {
    const initialState = {
      ReUser: this.user
    };
    this.bsModalRef = this.modalService.show(MsgModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
