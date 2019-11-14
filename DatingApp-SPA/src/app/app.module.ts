import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MemberEditResolver } from './_resolves/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

import { MemberDetailResolver } from './_resolves/member-detail.resolver';

import { ErrorInterceptor } from './_services/error.interceptor';

import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent} from './nav/nav.component';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MemberListResolver } from './_resolves/member-list.resolver';

import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


import { ReactiveFormsModule } from '@angular/forms';
import {TimeAgoPipe} from 'time-ago-pipe';


export function tokenGetter(){
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
   overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
}


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      HomeComponent,
      MemberListComponent,
      MemberCardComponent,
      ListsComponent,
      MessagesComponent,
      MemberDetailComponent,
      MemberEditComponent,
      TimeAgoPipe,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }) // added for tokenGetter
   ],
   providers: [
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorInterceptor,
         multi: true,
      }, 
      MemberDetailResolver,
      PreventUnsavedChanges,
      MemberEditResolver,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
      MemberListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
