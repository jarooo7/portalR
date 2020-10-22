import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/_models/login.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseAddress = environment.apiUrl + 'auth/';
  dekoded: any;
  jwthelper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  login(model: Login) {
    return this.http.post(this.baseAddress + 'login', model)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.dekoded = this.jwthelper.decodeToken(user.token);
        }
      }));
  }

  register(model: Login) {
    return this.http.post(this.baseAddress + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    this.dekoded = this.jwthelper.decodeToken(token);
    return !this.jwthelper.isTokenExpired(token);
  }
}
