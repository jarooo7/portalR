import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_serwises/auth/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_serwises/alertify/alertify.service';

import { UserService } from './_serwises/user/user.service';
import { UsersListComponent } from './user/users-list/users-list.component';
import { JwtModule } from '@auth0/angular-jwt';

export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    HomeComponent,
    UsersListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['http://localhost:5000/auth/'],
      },
    }),
  ],
  providers: [
    AuthService,
    AlertifyService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
