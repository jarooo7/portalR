import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { AuthService } from '../_serwises/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {


  constructor(private auth: AuthService, private router: Router, private alertify: AlertifyService) {

  }


  canActivate(): boolean {

    if (this.auth.loggedIn()) {
      this.router.navigate(['/uzytkownicy']);
      return false;
    }
    return true;
  }

}
