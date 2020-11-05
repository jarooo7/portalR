import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from '../_models/pagination';
import { User } from '../_models/User.model';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { AuthService } from '../_serwises/auth/auth.service';
import { UserService } from '../_serwises/user/user.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(
    private userService: UserService,
    private alertity: AlertifyService,
    private route: ActivatedRoute,
    private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.likesParam = 'All';
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currantPage, this.pagination.itemPerPage, null, this.likesParam)
      .subscribe((res: PaginationResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertity.error(error);
      });
  }
  pageChanged(event: any): void {
    this.pagination.currantPage = event.page;
    this.loadUsers();
  }

  loadUsersLike(option: string){
    this.likesParam = option;
    this.loadUsers();
  }

}
