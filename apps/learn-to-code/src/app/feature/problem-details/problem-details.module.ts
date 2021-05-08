import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AceEditorModule} from "ng2-ace-editor";

import {ProblemDetailsComponent} from './problem-details.component';
import {ProblemDetailsRoutingModule} from "./problem-details-routing.module";
import {MaterialModule} from "../../core/material/material.module";

@NgModule({
  declarations: [
    ProblemDetailsComponent
  ],
  imports: [
    CommonModule,
    ProblemDetailsRoutingModule,
    MaterialModule,
    AceEditorModule
  ]
})
export class ProblemDetailsModule {
}
