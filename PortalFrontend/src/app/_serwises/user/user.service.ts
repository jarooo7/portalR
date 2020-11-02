import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/User.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);

    }

    return this.http.get<User[]>(this.baseUrl + 'user', { observe: 'response', params }).pipe(
      map(
        response => {
          paginationResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse( response.headers.get('Pagination'));
          }

          return paginationResult;
        }
      )
   );
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

  delPhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'user/' + userId + '/photos/' + id);
  }

}
