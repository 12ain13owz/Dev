import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeServicesComponent } from './practice-services.component';

describe('PracticeServicesComponent', () => {
  let component: PracticeServicesComponent;
  let fixture: ComponentFixture<PracticeServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeServicesComponent]
    });
    fixture = TestBed.createComponent(PracticeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
