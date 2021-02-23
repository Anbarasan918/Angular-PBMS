import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpSalesComponent } from './pump-sales.component';

describe('PumpSalesComponent', () => {
  let component: PumpSalesComponent;
  let fixture: ComponentFixture<PumpSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
