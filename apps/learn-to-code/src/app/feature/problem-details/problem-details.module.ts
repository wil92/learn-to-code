import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemDetailsComponent } from './problem-details.component';
import {ProblemDetailsRoutingModule} from "./problem-details-routing.module";
import {MaterialModule} from "../../core/material/material.module";

@NgModule({
  declarations: [
    ProblemDetailsComponent
  ],
  imports: [
    CommonModule,
    ProblemDetailsRoutingModule,
    MaterialModule
  ]
})
export class ProblemDetailsModule { }
