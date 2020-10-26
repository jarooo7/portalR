import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/User.model';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { AuthService } from '../_serwises/auth/auth.service';
import { UserService } from '../_serwises/user/user.service';

@Injectable()

export class UserEditResolver implements Resolve<User>{
    constructor(
        private userService: UserService,
        private router: Router,
        private alerti: AlertifyService,
        private authService: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.dekoded.nameid).pipe(
            catchError(error => {
                this.alerti.error('Problem z pobranem danych');
                this.router.navigate(['/uzytkownicy']);
                return of(null);
            })
        );
    }
}
