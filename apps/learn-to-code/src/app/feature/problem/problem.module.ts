import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemComponent } from './problem.component';
import {ProblemRoutingModule} from "./problem-routing.module";


@NgModule({
  declarations: [
    ProblemComponent
  ],
  imports: [
    CommonModule,
    ProblemRoutingModule
  ]
})
export class ProblemModule { }
