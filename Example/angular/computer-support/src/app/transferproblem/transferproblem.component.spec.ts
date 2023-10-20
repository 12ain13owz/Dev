import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferproblemComponent } from './transferproblem.component';

describe('TransferproblemComponent', () => {
  let component: TransferproblemComponent;
  let fixture: ComponentFixture<TransferproblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferproblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
