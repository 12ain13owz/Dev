import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHandlingComponent } from './form-handling.component';

describe('FormHandlingComponent', () => {
  let component: FormHandlingComponent;
  let fixture: ComponentFixture<FormHandlingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormHandlingComponent]
    });
    fixture = TestBed.createComponent(FormHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
