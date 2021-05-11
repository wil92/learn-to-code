import { Component, OnInit } from '@angular/core';
import {Problem} from "../../core/models/problem.model";
import {MatTableDataSource} from "@angular/material/table";
import {ProblemService} from "../../core/services/problem.service";

@Component({
  selector: 'learn-to-code-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  problems: Problem[] = [];

  extraOptions = false;

  displayedColumns: string[] = ['title', 'actions'];
  dataSource = new MatTableDataSource<Problem>(this.problems);

  constructor(private problemService: ProblemService) { }

  ngOnInit(): void {
    this.updateListOfProblems();
  }

  removeProblem(id) {
    this.problemService.deleteProblem(id).subscribe(() => this.updateListOfProblems());
  }

  updateListOfProblems() {
    this.problemService.getProblems().subscribe((problems) => {
      this.dataSource = new MatTableDataSource<Problem>(problems);
    });
  }
}
