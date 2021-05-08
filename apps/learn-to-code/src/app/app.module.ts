import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FlexLayoutModule} from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FlexLayoutModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
