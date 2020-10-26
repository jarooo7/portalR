import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
        { path: 'uzytkownicy', component: UsersListComponent, resolve: {users: UserListResolver}},
        { path: 'uzytkownicy/:id', component: UserDetailComponent, resolve: {user: UserDetailResolver}},
        { path: 'polubienia', component: LikesComponent},
        { path: 'wiadomosci', component: MessagesComponent},
    ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
