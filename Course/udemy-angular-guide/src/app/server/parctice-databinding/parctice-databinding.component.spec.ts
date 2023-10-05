import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcticeDatabindingComponent } from './parctice-databinding.component';

describe('ParcticeDatabindingComponent', () => {
  let component: ParcticeDatabindingComponent;
  let fixture: ComponentFixture<ParcticeDatabindingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcticeDatabindingComponent]
    });
    fixture = TestBed.createComponent(ParcticeDatabindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
