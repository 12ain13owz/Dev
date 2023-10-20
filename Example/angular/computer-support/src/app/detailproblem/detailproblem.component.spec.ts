import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailproblemComponent } from './detailproblem.component';

describe('DetailproblemComponent', () => {
  let component: DetailproblemComponent;
  let fixture: ComponentFixture<DetailproblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailproblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
