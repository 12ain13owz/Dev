import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticePipesComponent } from './practice-pipes.component';

describe('PracticePipesComponent', () => {
  let component: PracticePipesComponent;
  let fixture: ComponentFixture<PracticePipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PracticePipesComponent]
    });
    fixture = TestBed.createComponent(PracticePipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
