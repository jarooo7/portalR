import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/_models/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private baseAddress = 'http://localhost:5000/auth/';

  constructor(private http: HttpClient) { }

  login(model: Login) {
    return this.http.post(this.baseAddress + 'login', model)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      }));
  }


}
