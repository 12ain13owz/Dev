import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServer2Component } from './edit-server2.component';

describe('EditServer2Component', () => {
  let component: EditServer2Component;
  let fixture: ComponentFixture<EditServer2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditServer2Component]
    });
    fixture = TestBed.createComponent(EditServer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
