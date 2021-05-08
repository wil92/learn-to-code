import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemDetailsComponent } from './problem-details.component';

describe('ProblemDetailsComponent', () => {
  let component: ProblemDetailsComponent;
  let fixture: ComponentFixture<ProblemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemDetailsComponent ]
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
