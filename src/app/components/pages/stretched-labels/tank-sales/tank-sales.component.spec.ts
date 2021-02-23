import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankSalesComponent } from './tank-sales.component';

describe('TankSalesComponent', () => {
  let component: TankSalesComponent;
  let fixture: ComponentFixture<TankSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
