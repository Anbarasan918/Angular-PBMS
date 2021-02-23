import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";

@Component({
  selector: 'app-tank-sales',
  templateUrl: './tank-sales.component.html',
  styleUrls: ['./tank-sales.component.scss']
})
export class TankSalesComponent implements OnInit {

  public currentTabIndex: number;
  public currentLabel: string;

  tankSales: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  tanks: [];
  pumps= [];
  filter = {};
  products = [];
  date = new Date();
  dataTableConfig:any={};

  //displayedColumns=["tankName","product","openingStock","receiptqty","closingDip","pumpSales","tankSales","variation"];

  displayedColumns = [{"label":'Tank Name',"code":"tankName"},
  {"label":'Product',"code":"product"},
  {"label":'Opening Stock',"code":"openingStock"},
  {"label":'Receipt Qty',"code":"receiptqty"},
  {"label":'Closing Dip',"code":"closingDip"},
  {"label":'Pump Sales',"code":"pumpSales"},
  {"label":'Tank Sales',"code":"tankSales"},
  {"label":'Variation',"code":"variation"}
  ];

  constructor(private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private dataService: DataService) {
    this.currentTabIndex = 0;
  }

  ngAfterOnInit() {
    this.control = this.tankSales.get('entries') as FormArray;
  }

  ngOnInit() {
    this.touchedRows = [];
    this.tankSales = this.fb.group({
      entries: this.fb.array([])
    });

    this.tankSales.valueChanges.subscribe(data => this.updateForm(data));

    this.addRow();
    this.getTanks();
    this.getProducts();
    this.initializeDataGridConfig();
  }


  updateForm(data){
    var entries=data.entries;
    var index=0;
    for (let data of entries) { 
     
      var rows = <FormArray>this.tankSales.get("entries");
      if(rows.controls[index].get("sales")!=data.sales){
        rows.controls[index].patchValue(data);
      }
      index++;
    // this.tankSales.get("entries")[i].patchValue(i); 
    }
  }

  get entries(): FormArray {
    return this.tankSales.get('entries') as FormArray;
  } 

  initiateForm(): FormGroup {
    return this.fb.group({
      tankName: ['',[Validators.required]],
      product: ['',[Validators.required]],
      openingStock: ['',[Validators.required]],
      receiptqty: ['',[Validators.required]],
      closingDip: ['',[Validators.required]],     
      pumpSales: ['',[Validators.required]],
      tankSales: ['',[Validators.required]],
      variation: ['',[Validators.required]],
      isEditable: [true]
    });

  }
  
  onSubmit(){

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
      console.log(this.tanks);
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
      console.log(this.products);

  }


  addRow() {
    const control = this.tankSales.get('entries') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.tankSales.get('entries') as FormArray;
    control.removeAt(index); 
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }
  get getFormControls() {
    const control = this.tankSales.get('entries') as FormArray;
    return control;
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

