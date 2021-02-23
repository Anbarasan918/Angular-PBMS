import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatechangeEntryComponent } from './ratechange-entry.component';

describe('RatechangeEntryComponent', () => {
  let component: RatechangeEntryComponent;
  let fixture: ComponentFixture<RatechangeEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatechangeEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatechangeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
