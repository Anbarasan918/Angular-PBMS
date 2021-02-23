import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterdynamicTableComponent } from './footerdynamic-table.component';

describe('FooterdynamicTableComponent', () => {
  let component: FooterdynamicTableComponent;
  let fixture: ComponentFixture<FooterdynamicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterdynamicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterdynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
