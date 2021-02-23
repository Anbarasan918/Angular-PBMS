import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceEntryComponent } from './attendance-entry.component';

describe('AttendanceEntryComponent', () => {
  let component: AttendanceEntryComponent;
  let fixture: ComponentFixture<AttendanceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
