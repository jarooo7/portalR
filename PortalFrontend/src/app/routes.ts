import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard.ts';
import { LikeResolver } from './_resolvers/like.resolver';
import { MessageResolver } from './_resolvers/message.resolver';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'uzytkownicy', component: UsersListComponent, resolve: { users: UserListResolver } },
            {
                path: 'uzytkownicy/edycja',
                component: UserEditComponent,
                resolve: { user: UserEditResolver },
                canDeactivate: [PreventUnsavedChanges]
            },
            { path: 'uzytkownicy/:id', component: UserDetailComponent, resolve: { user: UserDetailResolver } },
            { path: 'polubienia', component: LikesComponent, resolve: { users: LikeResolver } },
            { path: 'wiadomosci', component: MessagesComponent , resolve: {messages : MessageResolver } },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
