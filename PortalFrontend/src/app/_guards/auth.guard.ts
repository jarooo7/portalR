import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { AuthService } from '../_serwises/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private auth: AuthService, private router: Router, private alertify: AlertifyService) {

  }


  canActivate(): boolean {

    if (this.auth.loggedIn()) {
      return true;
    }
    this.alertify.error('Nie masz uprawnień');
    this.router.navigate(['/home']);
    return false;
  }

}
