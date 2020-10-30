import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../_models/login.model';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { AuthService } from '../_serwises/auth/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: Login = new Login();

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(next => {
        this.alertify.success('Zalogowałeś się');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/uzytkownicy']);
      });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.dekoded = null;
    this.alertify.message('Wylogowałeś się');
    this.router.navigate(['/home']);
  }

}
