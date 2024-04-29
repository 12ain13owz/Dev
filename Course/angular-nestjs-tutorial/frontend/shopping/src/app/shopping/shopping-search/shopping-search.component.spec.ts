import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingSearchComponent } from './shopping-search.component';

describe('ShoppingSearchComponent', () => {
  let component: ShoppingSearchComponent;
  let fixture: ComponentFixture<ShoppingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
