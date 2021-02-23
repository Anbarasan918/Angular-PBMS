import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.scss']
})
export class ExpenseEntryComponent implements OnInit {
  public currentTabIndex: number;
  public currentLabel: string;

  expenseEntry: FormGroup;
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
    this.control = this.expenseEntry.get('entries') as FormArray;
  }

  ngOnInit() {
    this.touchedRows = [];
    this.expenseEntry = this.fb.group({
      entries: this.fb.array([])
    });
    this.expenseEntry.valueChanges.subscribe(data => this.updateForm(data));

    this.addRow();
    this.getTanks();
    this.getPumps();
    this.getProducts();
  }

  updateForm(data){
    var entries=data.entries;
    var index=0;
    for (let data of entries) { 
      var rows = <FormArray>this.expenseEntry.get("entries");
      if(rows.controls[index].get("sales")!=data.sales){
        rows.controls[index].patchValue(data);
      }
      index++;
    // this.expenseEntry.get("entries")[i].patchValue(i); 
    }
    console.log(this.expenseEntry.get("entries"));
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      expenseName: ['',[Validators.required]],
      description: ['',[Validators.required]],
      amount: ['',[Validators.required]],
      
    });
  }

  get entries(): FormArray {
    return this.expenseEntry.get('entries') as FormArray;
  } 

  addRow() {
    const control = this.expenseEntry.get('entries') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.expenseEntry.get('entries') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.expenseEntry.value);
  }

  get getFormControls() {
    const control = this.expenseEntry.get('entries') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.expenseEntry.get('entries') as FormArray;
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
