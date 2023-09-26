import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSubjectComponent } from './test-subject.component';

describe('TestSubjectComponent', () => {
  let component: TestSubjectComponent;
  let fixture: ComponentFixture<TestSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSubjectComponent]
    });
    fixture = TestBed.createComponent(TestSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
