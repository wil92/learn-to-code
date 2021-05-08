import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class MaterialModule { }
