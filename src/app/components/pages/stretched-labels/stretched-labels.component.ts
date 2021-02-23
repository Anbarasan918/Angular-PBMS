import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";
import { table } from 'console';

@Component({
  selector: 'app-stretched-labels',
  templateUrl: './stretched-labels.component.html',
  styleUrls: ['./stretched-labels.component.scss']
})
export class StretchedLabelsComponent implements OnInit {
  public displayedColumns:string[];
  public currentTabIndex: number;
  public currentLabel: string;
  date:any;
  
  constructor(private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private dataService: DataService) {
    this.currentTabIndex = 0; 
  }

  ngAfterOnInit() {
     
  }

  ngOnInit() { 
  } 

  public changeTabIndex(index: number): void {
    this.currentTabIndex = index;
  }
  
}
