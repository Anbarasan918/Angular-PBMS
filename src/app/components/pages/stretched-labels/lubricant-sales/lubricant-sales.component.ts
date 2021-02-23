import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";

@Component({
  selector: 'app-lubricant-sales',
  templateUrl: './lubricant-sales.component.html',
  styleUrls: ['./lubricant-sales.component.scss']
})
export class LubricantSalesComponent implements OnInit {

  public currentTabIndex: number;
  public currentLabel: string;

  lubricationSales: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  tanks: any;
  pumps: [];
  filter = {};
  products = [];
  date = new Date();
  dataTableConfig:any={};
  displayedColumns = [{"label":'Tank Name',"code":"selectLubricant"} 
  ];

  constructor(private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private dataService: DataService) {
    this.currentTabIndex = 0;
  }

  ngAfterOnInit() {
    this.control = this.lubricationSales.get('entries') as FormArray;
  }

  ngOnInit() {
    this.touchedRows = [];
    this.lubricationSales = this.fb.group({
      entries: this.fb.array([])
    });

    this.lubricationSales.valueChanges.subscribe(data => this.updateForm(data));

    this.addRow();
    this.getTanks();
    this.getPumps();
    this.getProducts();
    this.initializeDataGridConfig();
  }

rate=100;
  updateForm(data){
    var entries=data.entries;
    var index=0;
    for (let data of entries) { 
          data.closingStock=data.openingStock-data.sales;
          data.rate=50;
          data.salesAmount=data.sales*data.rate;
      var rows = <FormArray>this.lubricationSales.get("entries");
      if(rows.controls[index].get("closingStock").value!=data.closingStock){
        rows.controls[index].patchValue(data);
      }
      index++;
    // this.lubricationSales.get("entries")[i].patchValue(i); 
    }
 
  }

  get entries(): FormArray {
    return this.lubricationSales.get('entries') as FormArray;
  } 

  initiateForm(): FormGroup {
    return this.fb.group({
      selectLubricant: ['',[Validators.required]],
      openingStock: ['',[Validators.required]],
      closingStock: ['',[Validators.required]],
      sales: ['',[Validators.required]],
      rate: ['',[Validators.required]],     
      salesAmount: ['',[Validators.required]],
      netSalesAmount: ['',[Validators.required]],
      isEditable: [true]
    });
    
  }

  addRow() {
    const control = this.lubricationSales.get('entries') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.lubricationSales.get('entries') as FormArray;
    control.removeAt(index); 
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  
  onSubmit(){

    console.log(this.lubricationSales.value);
  }


  saveUserDetails() {
    console.log(this.lubricationSales.value);
  }

  get getFormControls() {
    const control = this.lubricationSales.get('entries') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.lubricationSales.get('entries') as FormArray;
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

  initializeDataGridConfig(){  
    this.dataTableConfig.hideToolbar=true;
    this.dataTableConfig.emptyStateTitle='No Entries Found';
    this.dataTableConfig.errorMsg='Oops... We have trouble getting ur data. Pls hold on..'; 
  }

}
