import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {ProblemService} from "../../core/services/problem.service";
import {Problem} from "../../core/models/problem.model";


@Component({
  selector: 'learn-to-code-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.scss']
})
export class ProblemDetailsComponent implements OnInit {

  problem: Problem;

  constructor(private router: Router,
              private activeRouter: ActivatedRoute,
              private problemService: ProblemService) { }

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    this.problemService.getProblemById(id).subscribe((problem: Problem) => this.problem = problem);
  }

}
