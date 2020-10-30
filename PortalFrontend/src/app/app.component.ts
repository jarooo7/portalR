import { Component, OnInit } from '@angular/core';
import { User } from './_models/User.model';
import { AuthService } from './_serwises/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
    }
  }
}

