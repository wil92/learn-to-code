import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {ProblemService} from "../../core/services/problem.service";
import {Problem} from "../../core/models/problem.model";
import {Test} from "../../core/models/test.model";
import {Environment} from "../../core/injectors/environment";


@Component({
  selector: 'learn-to-code-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.scss']
})
export class ProblemDetailsComponent implements OnInit {

  problem: Problem;
  tests: Test[] = [];

  code = '';

  status = '';

  constructor(private environment: Environment,
              private router: Router,
              private activeRouter: ActivatedRoute,
              private problemService: ProblemService) { }

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    this.problemService.getProblemById(id).subscribe((problem: Problem) => {
      this.problem = problem;
      this.updateFilesList();
    });
  }

  sendSolution() {
    this.problemService.sendSolution(this.code, this.problem._id).subscribe((res: {result: string, solutionId: string}) => {
      this.status = res.result;
    });
  }

  updateFilesList() {
    this.problemService.getFilesByProblemId(this.problem._id).subscribe(tests => {
      this.tests = tests;
    });
  }

  getFileDownloadLink(filename: string) {
    return `${this.environment.apiUrl}/tests/download/${filename}`;
  }
}
