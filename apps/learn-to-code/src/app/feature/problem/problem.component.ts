import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Observable} from "rxjs";
import {map, mergeMap} from "rxjs/operators";

import {ProblemService} from "../../core/services/problem.service";
import {Problem} from "../../core/models/problem.model";
import {Test} from "../../core/models/test.model";

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

  initialProblem: Problem;
  tests: Test[] = [];

  @ViewChild("files", {static: false}) filesUpload: ElementRef;

  constructor(private router: Router,
              private activeRouter: ActivatedRoute,
              private problemService: ProblemService) {
  }

  ngOnInit(): void {
    if (this.activeRouter.snapshot.paramMap.has('id')) {
      this.isEditProblem = true;

      this.problemService.getProblemById(this.activeRouter.snapshot.paramMap.get('id')).subscribe((problem) => {
        this.initialProblem = problem;
        this.form.get('title').setValue(problem.title);
        this.form.get('description').setValue(problem.description);
        this.form.get('inputDescription').setValue(problem.inputDescription);
        this.form.get('inputExample').setValue(problem.inputExample);
        this.form.get('outputDescription').setValue(problem.outputDescription);
        this.form.get('outputExample').setValue(problem.outputExample);

        this.updateFilesList();
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

    let action: Observable<Problem>;

    if (this.isEditProblem) {
      action = this.problemService.editProblem(this.activeRouter.snapshot.paramMap.get('id'), problem);
    } else {
      action = this.problemService.createProblem(problem);
    }

    action.pipe(mergeMap(res => this.uploadFiles(res._id).pipe(map(() => res._id))))
      .subscribe((id) => {
        if (!this.initialProblem) {
          this.router.navigate([`/problem/${id}`]);
        } else {
          this.updateFilesList();
        }
      });
  }

  uploadFiles(problemId: string): Observable<any> {
    return this.problemService.uploadFiles(this.filesUpload.nativeElement.files, problemId);
  }

  deleteTest(id: string) {
    this.problemService.removeTest(id).subscribe(() => this.updateFilesList());
  }

  updateFilesList() {
    if (this.initialProblem) {
      this.problemService.getFilesByProblemId(this.initialProblem._id).subscribe(tests => {
        this.tests = tests;
      });
    }
  }
}
