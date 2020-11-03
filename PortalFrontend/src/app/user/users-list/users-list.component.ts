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
  sortParam = 'Ostatnia aktywność';

  genderList = [{ value: 'mężczyzna', display: 'Meżczyźni' },
  { value: 'kobieta', display: 'Kobiety' }];

  sortList = [
    { value: 'lastAction', display: 'Ostatnia aktywność', id: 0 },
    { value: 'age', display: 'Wiek', id: 1 },
    { value: 'userName', display: 'Nazwa użytkownika', id: 2 },
    { value: 'created', display: 'Data dołaczenia', id: 3 }];
  userParams: any = {};
  user: User;

  users: User[];

  constructor(private userService: UserService, private alertity: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.page = data.users.pagination;
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userParams.gender = this.user.gender === 'kobieta' ? 'mężczyzna' : 'kobieta';
    this.userParams.city = '';
    this.userParams.minAge = 16;
    this.userParams.maxAge = 100;
    this.userParams.orderBy = 'lastAction';

  }
  pageChanged(event: any): void {
    this.page.currantPage = event.page;
    this.loadUsers();
  }
  loadUsers() {
    console.log(this.userParams);

    this.userService.getUsers(this.page.currantPage, this.page.itemPerPage, this.userParams)
      .subscribe((res: PaginationResult<User[]>) => {
        this.users = res.result;
        this.page = res.pagination;
      }, error => {
        this.alertity.error(error);
      });
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'kobieta' ? 'mężczyzna' : 'kobieta';
    this.userParams.city = '';
    this.userParams.minAge = 16;
    this.userParams.maxAge = 100;
    this.userParams.orderBy = 'lastAction';
    this.loadUsers();
  }

  sort(orderBy: number) {
    this.userParams.orderBy = this.sortList[orderBy].value;
    this.sortParam = this.sortList[orderBy].display;
    this.loadUsers();
  }
}
