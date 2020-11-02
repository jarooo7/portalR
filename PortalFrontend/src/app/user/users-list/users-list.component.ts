import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/User.model';
import { AlertifyService } from 'src/app/_serwises/alertify/alertify.service';
import { UserService } from 'src/app/_serwises/user/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  page: Pagination;

  users: User[];

  constructor(private userService: UserService, private alertity: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.page = data.users.pagination;
    });

  }
  pageChanged(event: any): void {
    this.page.currantPage = event.page;
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers(this.page.currantPage, this.page.itemPerPage)
     .subscribe((res: PaginationResult<User[]>) => {
      this.users = res.result;
      this.page = res.pagination;
    }, error => {
      this.alertity.error(error);
    });
  }
}
