import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeServerComponent } from './practice-server.component';

describe('PracticeServerComponent', () => {
  let component: PracticeServerComponent;
  let fixture: ComponentFixture<PracticeServerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeServerComponent]
    });
    fixture = TestBed.createComponent(PracticeServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
