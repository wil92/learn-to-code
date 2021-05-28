import {Component, OnInit} from '@angular/core';
import {Problem} from "../../core/models/problem.model";
import {MatTableDataSource} from "@angular/material/table";
import {ProblemService} from "../../core/services/problem.service";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'learn-to-code-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  problems: Problem[] = [];

  displayedColumns: string[] = ['problem', 'title', 'actions'];
  dataSource = new MatTableDataSource<Problem>(this.problems);

  constructor(
    private problemService: ProblemService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    if (!this.authService.isLogin()) {
      this.displayedColumns = ['title', 'actions'];
    }
    this.updateListOfProblems();
  }

  removeProblem(id) {
    this.problemService.deleteProblem(id).subscribe(() => this.updateListOfProblems());
  }

  logout() {
    this.authService.logout();
    this.displayedColumns = ['title', 'actions'];
    this.updateListOfProblems();
  }

  updateListOfProblems() {
    this.problemService.getProblems().subscribe((problems) => {
      this.dataSource = new MatTableDataSource<Problem>(problems);
    });
  }
}
