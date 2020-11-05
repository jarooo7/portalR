import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/User.model';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { UserService } from '../_serwises/user/user.service';

@Injectable()

export class LikeResolver implements Resolve<User[]>{
    pageNumber = 1;
    pageSize = 12;
    likesParam = 'All';


    constructor(
        private userService: UserService,
        private router: Router,
        private alerti: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
            catchError(error => {
                this.alerti.error('Problem z pobranem danych');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
