import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/_models/Message';
import { PaginationResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/User.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  user: User = JSON.parse(localStorage.getItem('user'));


  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);

    }
    if (userParams != null) {
      params = params.append('minAge', userParams.minAge ? userParams.minAge : 18);
      params = params.append('maxAge', userParams.maxAge ? userParams.maxAge : 100);
      params = params.append('gender', userParams.gender);
      if (userParams.city !== '' && userParams.city != null) {
        params = params.append('city', userParams.city);
      }
      params = params.append('orderBy', userParams.orderBy);
    }
    if (likesParams != null) {
      switch (likesParams) {
        case 'UserLikes':
          params = params.append('UserLikes', 'true');
          break;
        case 'UserIsLiked':
          params = params.append('UserIsLiked', 'true');
          break;
        case 'All':
          params = params.append('UserIsLiked', 'true');
          params = params.append('UserLikes', 'true');
          break;
      }

    }
    return this.http.get<User[]>(this.baseUrl + 'user', { observe: 'response', params }).pipe(
      map(
        response => {
          paginationResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
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

  sendLike(userId: number, recipientId: number) {
    return this.http.post(this.baseUrl + 'user/' + userId + '/like/' + recipientId, {});
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {

    const paginationResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();
    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(this.baseUrl + 'user/' + id + '/message', { observe: 'response', params })
      .pipe(
        map(response => {
          paginationResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginationResult;
        })
      );
  }

}
