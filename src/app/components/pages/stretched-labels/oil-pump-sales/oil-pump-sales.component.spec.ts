import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilPumpSalesComponent } from './oil-pump-sales.component';

describe('OilPumpSalesComponent', () => {
  let component: OilPumpSalesComponent;
  let fixture: ComponentFixture<OilPumpSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilPumpSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilPumpSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
