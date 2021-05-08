import { Component, OnInit } from '@angular/core';
import {Problem} from "../../core/models/problem.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'learn-to-code-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  problems = [
    {
      title: 'problem 1',
      description: 'somsagd asdf asdf sad',
      inputDescription: 'asdfasdf',
      inputExample: 'asdfasdfd',
      outputDescription: 'asdfasdf',
      outputExample: 'asdfasdfasdf'
    } as Problem,
    {
      title: 'problem 2',
      description: 'somsagd asdf asdf sad',
      inputDescription: 'asdfasdf',
      inputExample: 'asdfasdfd',
      outputDescription: 'asdfasdf',
      outputExample: 'asdfasdfasdf'
    } as Problem
  ];

  displayedColumns: string[] = ['title', 'description', 'actions'];
  dataSource = new MatTableDataSource<Problem>(this.problems);

  constructor() { }

  ngOnInit(): void {
  }

}
