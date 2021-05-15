import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {Environment} from "./core/injectors/environment";
import {environment} from "../environments/environment";
import {AuthService} from "./core/services/auth.service";
import {LOCAL_STORAGE} from "./core/injectors/localstorage";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: Environment, useValue: environment},
    {provide: LOCAL_STORAGE, useValue: localStorage},
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
