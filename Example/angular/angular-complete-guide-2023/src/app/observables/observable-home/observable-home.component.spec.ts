import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableHomeComponent } from './observable-home.component';

describe('ObservableHomeComponent', () => {
  let component: ObservableHomeComponent;
  let fixture: ComponentFixture<ObservableHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservableHomeComponent]
    });
    fixture = TestBed.createComponent(ObservableHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
