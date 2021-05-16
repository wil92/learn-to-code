import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

import {of} from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import {ProblemService} from "../../core/services/problem.service";
import {AuthService} from "../../core/services/auth.service";

class ProblemServiceStub {
  getProblems = () => of([]);
}

class AuthServiceStub {
  isLogin = () => true;
  isAdmin = () => true;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DashboardComponent ],
      providers: [
        {provide: ProblemService, useClass: ProblemServiceStub},
        {provide: AuthService, useClass: AuthServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
