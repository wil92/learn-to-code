import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";

import {ProblemComponent} from './problem.component';
import {Environment} from "../../core/injectors/environment";
import {ProblemService} from "../../core/services/problem.service";

class ProblemServiceStub {
}

describe('ProblemComponent', () => {
  let component: ProblemComponent;
  let fixture: ComponentFixture<ProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProblemComponent],
      providers: [
        {provide: Environment, useValue: {}},
        {provide: ProblemService, useClass: ProblemServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
