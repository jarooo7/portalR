import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user');
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'user/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'user/' + userId + '/photos/' + id + '/setMain', {});
  }

}
