import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";
import { table } from 'console';

@Component({
  selector: 'app-pump-sales',
  templateUrl: './pump-sales.component.html',
  styleUrls: ['./pump-sales.component.scss']
})
export class PumpSalesComponent implements OnInit {
  public displayedColumns:any[];
  public currentTabIndex: number;
  public currentLabel: string;

  pumpSales: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  tanks: any;
  pumps: [];
  filter = {};
  products = [];
  date = new Date();
  dataTableConfig:any={};
  gridData: any[]=[];
 // gridData:any[];
  
  constructor(private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private dataService: DataService) {
    this.currentTabIndex = 0; 
    this.displayedColumns = [{"label":'Nozzle Name',"code":"name"},
                            {"label":'Meter Opening',"code":"meterOpening"},
                            {"label":'Meter Closing',"code":"meterClosing"},
                            {"label":'Sales',"code":"sales"},
                            {"label":'Product',"code":"product"},
                            {"label":'Amount',"code":"amount"}
                            ];
  }

  ngAfterOnInit() {
    this.control = this.pumpSales.get('entries') as FormArray;
  }
 
  ngOnInit() {
    this.touchedRows = [];
    this.pumpSales = this.fb.group({
      entries: this.fb.array([])
    });

    this.pumpSales.valueChanges.subscribe(data => this.updateForm(data));
    this.addRow();
    this.getTanks();
    this.getPumps();
    this.getProducts();
    this.initializeDataGridConfig();
  }
product=100;
  updateForm(data){
    var entries=data.entries;
    var index=0;
    for (let data of entries) { 
      data.sales = data.meterClosing - data.meterOpening; 
      data.product=100;
      data.amount=data.sales*data.product;
      var rows = <FormArray>this.pumpSales.get("entries");
      if(rows.controls[index].get("sales").value!=data.sales){
        rows.controls[index].patchValue(data);
        //<any>this.gridData= rows.controls[index].patchValue(data);
      }
      index++;
    // this.pumpSales.get("entries")[i].patchValue(i); 
    }
 
  }

  get entries(): FormArray {
    return this.pumpSales.get('entries') as FormArray;
  } 

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['',[Validators.required]],
      meterOpening: ['',[Validators.required]],
      meterClosing: ['',[Validators.required]],
      sales: ['',[Validators.required]],
      product: ['' ],
      amount: ['' ],
      isEditable: [true]
    });
    
  }

  addRow() {
    const control = this.pumpSales.get('entries') as FormArray;
    control.push(this.initiateForm());

    const controls=this.pumpSales.controls;

    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    })
  }

  deleteRow(index: number) {
    const control = this.pumpSales.get('entries') as FormArray;
    control.removeAt(index); 
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }
 
  onSubmit() {
    this.spinnerService.toggleSpinner(true);
    console.log(this.pumpSales.value);
    this.dataService.addPumpSaleEntry(this.pumpSales.value.entries)
        .subscribe(page => {
            this.spinnerService.toggleSpinner(false); 
            this.getSavedEntries();
        }, (error) => {
            this.spinnerService.toggleSpinner(true);
        });
}

 
  get getFormControls() {
    const control = this.pumpSales.get('entries') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.pumpSales.get('entries') as FormArray;
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

  getSavedEntries(page: number = 1, size: number = 5) {

    this.dataTableConfig.isLoading=true;
  
    this.dataService.getPumpSaleEntries(+page, +size, this.filter)
        .subscribe(page => { 
            let totalCount = page.totalCount;  
            this.gridData = page.entityData;  
            this.dataTableConfig.isLoading=false;
        }, (error) => {
            this.dataTableConfig.isLoading=false;
            this.dataTableConfig.isError=false; 
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
