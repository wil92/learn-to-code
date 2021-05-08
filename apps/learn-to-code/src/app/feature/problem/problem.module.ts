import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemComponent } from './problem.component';
import {ProblemRoutingModule} from "./problem-routing.module";
import {MaterialModule} from "../../core/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProblemComponent
  ],
  imports: [
    CommonModule,
    ProblemRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProblemModule { }
