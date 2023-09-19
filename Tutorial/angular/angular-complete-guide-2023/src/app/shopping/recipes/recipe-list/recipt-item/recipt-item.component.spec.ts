import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptItemComponent } from './recipt-item.component';

describe('ReciptItemComponent', () => {
  let component: ReciptItemComponent;
  let fixture: ComponentFixture<ReciptItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReciptItemComponent]
    });
    fixture = TestBed.createComponent(ReciptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
