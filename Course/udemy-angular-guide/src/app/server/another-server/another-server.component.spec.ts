import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherServerComponent } from './another-server.component';

describe('AnotherServerComponent', () => {
  let component: AnotherServerComponent;
  let fixture: ComponentFixture<AnotherServerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnotherServerComponent]
    });
    fixture = TestBed.createComponent(AnotherServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
