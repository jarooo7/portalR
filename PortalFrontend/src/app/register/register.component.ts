import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { EventEmitter } from 'protractor';
import { Login } from '../_models/login.model';
import { AuthService } from '../_serwises/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: Login = new Login();

  constructor(authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit('');
    console.log('Anulowane');

  }
}
