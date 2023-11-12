import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproductsComponent } from './viewproduct.component';

describe('ViewproductComponent', () => {
  let component: ViewproductsComponent;
  let fixture: ComponentFixture<ViewproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewproductsComponent]
    });
    fixture = TestBed.createComponent(ViewproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
