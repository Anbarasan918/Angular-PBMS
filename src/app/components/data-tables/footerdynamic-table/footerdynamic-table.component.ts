import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-footerdynamic-table',
  templateUrl: './footerdynamic-table.component.html',
  styleUrls: ['./footerdynamic-table.component.scss']
})
export class FooterdynamicTableComponent implements OnInit {
  dataSource = [];
  
  @Input() displayedColumns:string[];
  @Input() gridData:string[];


 
  constructor() { }

  ngOnInit(): void {
    console.log(this.displayedColumns);
    console.log(this.gridData);
  }

}
