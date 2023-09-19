import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogproblemComponent } from './logproblem.component';

describe('LogproblemComponent', () => {
  let component: LogproblemComponent;
  let fixture: ComponentFixture<LogproblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogproblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
