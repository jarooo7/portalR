import { Component, OnInit } from '@angular/core';
import { Login } from '../_models/login.model';
import { AuthService } from '../_serwises/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: Login = new Login();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(next =>{console.log('zalogowałeś się');
      },error => {console.log("wystąpił błąd logowania");
      });
  }

}
