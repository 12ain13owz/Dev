import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcticeDirectivesComponent } from './parctice-directives.component';

describe('ParcticeDirectivesComponent', () => {
  let component: ParcticeDirectivesComponent;
  let fixture: ComponentFixture<ParcticeDirectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcticeDirectivesComponent]
    });
    fixture = TestBed.createComponent(ParcticeDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
