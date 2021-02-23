import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LubricantSalesComponent } from './lubricant-sales.component';

describe('LubricantSalesComponent', () => {
  let component: LubricantSalesComponent;
  let fixture: ComponentFixture<LubricantSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LubricantSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LubricantSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
