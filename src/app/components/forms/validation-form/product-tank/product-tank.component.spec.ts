import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTankComponent } from './product-tank.component';

describe('ProductTankComponent', () => {
  let component: ProductTankComponent;
  let fixture: ComponentFixture<ProductTankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
