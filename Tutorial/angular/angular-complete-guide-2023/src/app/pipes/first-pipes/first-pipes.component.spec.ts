import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPipesComponent } from './first-pipes.component';

describe('FirstPipesComponent', () => {
  let component: FirstPipesComponent;
  let fixture: ComponentFixture<FirstPipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstPipesComponent]
    });
    fixture = TestBed.createComponent(FirstPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
