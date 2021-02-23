import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";
import { FormGroup,FormArray,FormBuilder, Validators } from '@angular/forms';
@Component({
    selector: 'app-lubricant-creation',
    templateUrl: './lubricant.creation.component.html',
    styleUrls: ['./lubricant.creation.component.scss']
})
export class LubricantCreationComponent {
    public currentTabIndex: number;
    public currentLabel: string;
  
    lubricantCreation: FormGroup;
    control: FormArray;
    mode: boolean;
    touchedRows: any;
    tanks: any;
    pumps: [];
    filter = {};
    products = [];
    date = new Date();

    paymentMode=["credit",
                  "cash" ]

    supplierName=["H.P.C.L",
                  "Petorl"]              
  
    constructor(private fb: FormBuilder,
      private spinnerService: SpinnerService,
      private dataService: DataService) {
      this.currentTabIndex = 0;
    }
  
    ngAfterOnInit() {
      this.control = this.lubricantCreation.get('entries') as FormArray;
    }
  
    ngOnInit() {
      this.touchedRows = [];
      this.lubricantCreation = this.fb.group({
        entries: this.fb.array([])
      });
  
      this.lubricantCreation.valueChanges.subscribe(data => this.updateForm(data));
  
      this.addRow();
      this.getTanks();
      this.getPumps();
      this.getProducts();
    }
  
    initiateForm():FormGroup{
        return this.fb.group({
        paymentMode:[''],
        supplierName:[''],
        invoiceNumber:['',[Validators.required]],

        lubricantName:['',[Validators.required]],
        qty:['',[Validators.required]],
        amount:['',[Validators.required]],
        discount:['',[Validators.required]],
        gstPercentage:['',[Validators.required]],
        gst:['',[Validators.required]],
        otherTaxPercentage:['',[Validators.required]],
        otherTax:['',[Validators.required]],
        totalAmount:['',[Validators.required]]
    });
}
   
  
    get entries(): FormArray {
        return this.lubricantCreation.get('entries') as FormArray;
      } 
    
      updateForm(data){
        var entries=data.entries;
        var index=0;
        for (let data of entries) { 
          var rows = <FormArray>this.lubricantCreation.get("entries");
          if(rows.controls[index].get("sales")!=data.sales){
            rows.controls[index].patchValue(data);
          }
          index++;
        // this.lubricantCreation.get("entries")[i].patchValue(i); 
        }
      }
    
      addRow() {
        const control = this.lubricantCreation.get('entries') as FormArray;
        control.push(this.initiateForm());
      }
    
      deleteRow(index: number) {
        const control = this.lubricantCreation.get('entries') as FormArray;
        control.removeAt(index);
      }
    
      editRow(group: FormGroup) {
        group.get('isEditable').setValue(true);
      }
    
      doneRow(group: FormGroup) {
        group.get('isEditable').setValue(false);
      }
    
      saveUserDetails() {
        console.log(this.lubricantCreation.value);
      }
    
      get getFormControls() {
        const control = this.lubricantCreation.get('entries') as FormArray;
        return control;
      }
    
      submitForm() {
        const control = this.lubricantCreation.get('entries') as FormArray;
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
