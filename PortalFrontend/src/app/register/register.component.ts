import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../_serwises/auth/auth.service';
import { AlertifyService } from '../_serwises/alertify/alertify.service';
import { Login } from '../_models/login.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/User.model';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  locale = 'pl';
  locales = listLocales();
  bsConfig: Partial<BsDatepickerConfig>;
  user: User;
  model: Login = new Login();
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router,
    private localeService: BsLocaleService) { }

  ngOnInit() {
    this.createRegisterForm();

  }
  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { mismatch: true };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required],
      gender: ['kobieta'],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  register() {
    if (this.registerForm.valid) {

      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('rejestracja udana');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/uzytkownicy']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit('');
    console.log('Anulowane');
  }
}
