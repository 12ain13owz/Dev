import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableUserComponent } from './observable-user.component';

describe('ObservableUserComponent', () => {
  let component: ObservableUserComponent;
  let fixture: ComponentFixture<ObservableUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservableUserComponent]
    });
    fixture = TestBed.createComponent(ObservableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
