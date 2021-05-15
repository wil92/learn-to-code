import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";

import { ProblemService } from './problem.service';
import {Environment} from "../injectors/environment";

describe('ProblemService', () => {
  let service: ProblemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: Environment, useValue: {}}]
    });
    service = TestBed.inject(ProblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
