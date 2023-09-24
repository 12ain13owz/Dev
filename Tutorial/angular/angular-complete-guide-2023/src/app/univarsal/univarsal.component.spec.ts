import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnivarsalComponent } from './univarsal.component';

describe('UnivarsalComponent', () => {
  let component: UnivarsalComponent;
  let fixture: ComponentFixture<UnivarsalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnivarsalComponent]
    });
    fixture = TestBed.createComponent(UnivarsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
