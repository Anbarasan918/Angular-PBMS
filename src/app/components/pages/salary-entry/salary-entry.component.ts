import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';
import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";

@Component({
  selector: 'app-salary-entry',
  templateUrl: './salary-entry.component.html',
  styleUrls: ['./salary-entry.component.scss']
})
export class SalaryEntryComponent implements OnInit {
  salaryEntry: FormGroup;
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
    
  }

  ngAfterOnInit() {
    this.control = this.salaryEntry.get('entries') as FormArray;
  }

  ngOnInit() {
    this.touchedRows = [];
    this.salaryEntry = this.fb.group({
      entries: this.fb.array([])
    });

    this.salaryEntry.valueChanges.subscribe(data => this.updateForm(data));
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
      
      var rows = <FormArray>this.salaryEntry.get("entries");
      
      index++;
    // this.salaryEntry.get("entries")[i].patchValue(i); 
    }
 console.log(this.salaryEntry.get("entries"));
  }

  get entries(): FormArray {
    return this.salaryEntry.get('entries') as FormArray;
  } 

  initiateForm(): FormGroup {
    return this.fb.group({
      staffName: ['',[Validators.required]],
      fixedSalary: ['',[Validators.required]],
      presentDays: ['',[Validators.required]],
      ot: ['',[Validators.required]],
      salaryAmount: ['',[Validators.required]],     
      advAmount: ['',[Validators.required]],
      receivedAdvance: ['',[Validators.required]],
      balanceAdvance: ['',[Validators.required]],
      paidAdvance: ['',[Validators.required]],
      action: ['',[Validators.required]],
      isEditable: [true]
    });
    
  }

  addRow() {
    const control = this.salaryEntry.get('entries') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.salaryEntry.get('entries') as FormArray;
    control.removeAt(index); 
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  
  onSubmit(){
    const controls=this.salaryEntry.controls;

    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    })
  }

  saveUserDetails() {
    console.log(this.salaryEntry.value);
  }

  get getFormControls() {
    const control = this.salaryEntry.get('entries') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.salaryEntry.get('entries') as FormArray;
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

  


}
