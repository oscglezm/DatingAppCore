import { MemberListResolver } from './_resolves/member-list.resolver';
import { User } from './_models/user';
import { MemberDetailResolver } from './_resolves/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import {Routes} from '@angular/router';

import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, 
                resolve: { users: MemberListResolver} }, // add parameter , canActivate: [AuthGuard]
            { path: 'members/:id', component: MemberDetailComponent,
                resolve: {User: MemberDetailResolver} },
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];
 