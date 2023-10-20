import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmproblemComponent } from './confirmproblem.component';

describe('ConfirmproblemComponent', () => {
  let component: ConfirmproblemComponent;
  let fixture: ComponentFixture<ConfirmproblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmproblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
