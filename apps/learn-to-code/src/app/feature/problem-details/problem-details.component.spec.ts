import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

import {of} from "rxjs";

import { ProblemDetailsComponent } from './problem-details.component';
import {Environment} from "../../core/injectors/environment";
import {ProblemService} from "../../core/services/problem.service";
import {AuthService} from "../../core/services/auth.service";

class ProblemServiceStub {
  getProblemById = () => of({});
}

class AuthServiceStub {
  isLogin = () => false;
}

describe('ProblemDetailsComponent', () => {
  let component: ProblemDetailsComponent;
  let fixture: ComponentFixture<ProblemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ProblemDetailsComponent ],
      providers: [
        {provide: Environment, useValue: {}},
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: ProblemService, useClass: ProblemServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
