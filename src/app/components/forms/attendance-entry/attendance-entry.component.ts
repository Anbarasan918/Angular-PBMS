import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";

@Component({
  selector: 'app-attendance-entry',
  templateUrl: './attendance-entry.component.html',
  styleUrls: ['./attendance-entry.component.scss']
})
export class AttendanceEntryComponent implements OnInit {
  public currentTabIndex: number;
  public currentLabel: string;

  attendanceEntry: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  tanks: any;
  pumps: [];
  filter = {};
  products = [];
  date = new Date();

  constructor(private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private dataService: DataService) {
    this.currentTabIndex = 0;
  }

  ngAfterOnInit() {
    this.control = this.attendanceEntry.get('entries') as FormArray;
  }

  ngOnInit() {
    this.touchedRows = [];
    this.attendanceEntry = this.fb.group({
      entries: this.fb.array([])
    });
    this.attendanceEntry.valueChanges.subscribe(data => this.updateForm(data));

    this.addRow();
    this.getTanks();
    this.getPumps();
    this.getProducts();
  }

  updateForm(data){
    var entries=data.entries;
    var index=0;
    for (let data of entries) { 
      var rows = <FormArray>this.attendanceEntry.get("entries");
      if(rows.controls[index].get("sales")!=data.sales){
        rows.controls[index].patchValue(data);
      }
      index++;
    // this.attendanceEntry.get("entries")[i].patchValue(i); 
    }
    console.log(this.attendanceEntry.get("entries"));
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      staffName: ['',[Validators.required]],
      designation: ['',[Validators.required]],
      attendance: ['',[Validators.required]],
      
    });
  }

  get entries(): FormArray {
    return this.attendanceEntry.get('entries') as FormArray;
  } 

  addRow() {
    const control = this.attendanceEntry.get('entries') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.attendanceEntry.get('entries') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.attendanceEntry.value);
  }

  get getFormControls() {
    const control = this.attendanceEntry.get('entries') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.attendanceEntry.get('entries') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }

  getTanks(page: number = 1, size: number = 5) {

    this.spinnerService.toggleSpinner(true);

    this.dataService.getAllTanks(+page, +size, this.filter)
      .subscribe(page => {

        this.tanks = page.entityData;
        this.spinnerService.toggleSpinner(false)
      }, (error) => {
        this.spinnerService.toggleSpinner(false);
      });
  }

  getPumps(page: number = 1, size: number = 5) {

    this.spinnerService.toggleSpinner(true);

    this.dataService.getAllPumps(+page, +size, this.filter)
      .subscribe(page => {

        this.pumps = page.entityData;
        this.spinnerService.toggleSpinner(false)
      }, (error) => {
        this.spinnerService.toggleSpinner(false);
      });
  }

  getProducts(page: number = 1, size: number = 5) {

    this.spinnerService.toggleSpinner(true);

    this.dataService.getAllProducts(+page, +size, this.filter)
      .subscribe(page => {

        this.products = page.response;
        this.spinnerService.toggleSpinner(false)
      }, (error) => {
        this.spinnerService.toggleSpinner(false);
      });
  }

  public changeTabIndex(index: number): void {
    this.currentTabIndex = index;
  }
}
