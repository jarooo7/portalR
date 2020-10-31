import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/_models/login.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseAddress = environment.apiUrl + 'auth/';
  dekoded: any;
  jwthelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseAddress + 'login', model)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.dekoded = this.jwthelper.decodeToken(user.token);
          this.currentUser = user.user;
        }
      }));
  }

  register(model: any) {
    return this.http.post(this.baseAddress + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    this.dekoded = this.jwthelper.decodeToken(token);
    return !this.jwthelper.isTokenExpired(token);
  }
}
