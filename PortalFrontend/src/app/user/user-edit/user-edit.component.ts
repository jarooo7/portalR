import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User.model';
import { AlertifyService } from 'src/app/_serwises/alertify/alertify.service';
import { AuthService } from 'src/app/_serwises/auth/auth.service';
import { UserService } from 'src/app/_serwises/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotyfication($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alerti: AlertifyService,
    private userService: UserService,
    private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }
  updateUser() {
    this.userService.updateUser(this.auth.dekoded.nameid, this.user)
      .subscribe(
        () => {
          this.alerti.success('Profil pomyślnie zaktualizowany');
          this.editForm.reset(this.user);
        }, error => { this.alerti.error(error); }
      );
  }
}
