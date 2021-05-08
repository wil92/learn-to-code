import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ProblemService} from "../../core/services/problem.service";
import {Problem} from "../../core/models/problem.model";

@Component({
  selector: 'learn-to-code-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  isEditProblem = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    inputDescription: new FormControl('', [Validators.required]),
    inputExample: new FormControl('', [Validators.required]),
    outputDescription: new FormControl('', [Validators.required]),
    outputExample: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router,
              private activeRouter: ActivatedRoute,
              private problemService: ProblemService) {
  }

  ngOnInit(): void {
    if (this.activeRouter.snapshot.paramMap.has('id')) {
      this.isEditProblem = true;

      this.problemService.getProblemById(this.activeRouter.snapshot.paramMap.get('id')).subscribe((problem) => {
        this.form.get('title').setValue(problem.title);
        this.form.get('description').setValue(problem.description);
        this.form.get('inputDescription').setValue(problem.inputDescription);
        this.form.get('inputExample').setValue(problem.inputExample);
        this.form.get('outputDescription').setValue(problem.outputDescription);
        this.form.get('outputExample').setValue(problem.outputExample);
      })
    }
  }

  saveProblem() {
    const problem = {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      inputDescription: this.form.get('inputDescription').value,
      inputExample: this.form.get('inputExample').value,
      outputDescription: this.form.get('outputDescription').value,
      outputExample: this.form.get('outputExample').value
    } as Problem;
    if (this.isEditProblem) {
      this.problemService.editProblem(this.activeRouter.snapshot.paramMap.get('id'), problem).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.problemService.createProblem(problem).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
