import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { EventEmitter } from 'protractor';
import { Login } from '../_models/login.model';
import { AuthService } from '../_serwises/auth/auth.service';
import {AlertifyService } from '../_serwises/alertify/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: Login = new Login();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Rejestracja udana');
    }, error => this.alertify.error('Wystąpił błąd rejestracji'));

    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit('');
    console.log('Anulowane');
  }
}
