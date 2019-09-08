
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent} from './nav/nav.component';
import {FormsModule} from '@angular/forms';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule, //Add reference
      FormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
