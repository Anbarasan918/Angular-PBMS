import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";

@Component({
  selector: 'app-ratechange-entry',
  templateUrl: './ratechange-entry.component.html',
  styleUrls: ['./ratechange-entry.component.scss']
})
export class RatechangeEntryComponent implements OnInit {

  public currentTabIndex: number;
  public currentLabel: string;

  rateChangeEntry: FormGroup;
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
    this.control = this.rateChangeEntry.get('entries') as FormArray;
  }

  ngOnInit() {
    this.touchedRows = [];
    this.rateChangeEntry = this.fb.group({
      entries: this.fb.array([])
    });

    this.rateChangeEntry.valueChanges.subscribe(data => this.updateForm(data));
    this.addRow();
    this.getTanks();
    this.getPumps();
    this.getProducts();
  }

product=100;
  updateForm(data){
    var entries=data.entries;
    var index=0;
    for (let data of entries) { 
      data.sales = data.meterClosing - data.meterOpening; 
      data.product=100;
      data.amount=data.sales*data.product;
      var rows = <FormArray>this.rateChangeEntry.get("entries");
      if(rows.controls[index].get("sales").value!=data.sales){
        rows.controls[index].patchValue(data);
      }
      index++;
    // this.rateChangeEntry.get("entries")[i].patchValue(i); 
    }
 
  }

  get entries(): FormArray {
    return this.rateChangeEntry.get('entries') as FormArray;
  } 

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['',[Validators.required]],
      meterOpening: ['',[Validators.required]],
      meterClosing: ['',[Validators.required]],
      sales: ['',[Validators.required]],
      pumps: ['',[Validators.required]],     
      product: ['',[Validators.required]],
      amount: ['',[Validators.required]],
      isEditable: [true]
    });
    
  }

  addRow() {
    const control = this.rateChangeEntry.get('entries') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.rateChangeEntry.get('entries') as FormArray;
    control.removeAt(index); 
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  
  onSubmit(){
    const controls=this.rateChangeEntry.controls;

    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    })
  }

  saveUserDetails() {
    console.log(this.rateChangeEntry.value);
  }

  get getFormControls() {
    const control = this.rateChangeEntry.get('entries') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.rateChangeEntry.get('entries') as FormArray;
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
