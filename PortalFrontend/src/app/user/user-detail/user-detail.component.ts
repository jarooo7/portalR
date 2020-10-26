import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User.model';
import { AlertifyService } from 'src/app/_serwises/alertify/alertify.service';
import { UserService } from 'src/app/_serwises/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User;
  constructor(
    private userService: UserService,
    private alerti: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    // this.loadUser();
  }
  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params.id).subscribe(
  //     (user: User) => {
  //       this.user = user;
  //     }, error => {
  //       this.alerti.error(error);
  //     }
  //   );
  // }
}
