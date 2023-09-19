import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixproblemComponent } from './fixproblem.component';

describe('FixproblemComponent', () => {
  let component: FixproblemComponent;
  let fixture: ComponentFixture<FixproblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixproblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
