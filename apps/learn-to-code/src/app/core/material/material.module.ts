import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
