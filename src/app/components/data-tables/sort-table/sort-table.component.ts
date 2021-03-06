import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Ingredient } from '@app/models/index';

@Component({
    selector: 'app-sort-table',
    templateUrl: './sort-table.component.html'
})
export class SortTableComponent implements OnInit {
    public dataSource: MatTableDataSource<Ingredient>;
    public displayedColumns: string[];

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private http: HttpClient) {
        this.displayedColumns = ['num', 'categoryID', 'name', 'calories', 'IG'];
    }

    ngOnInit() {
        this.http.get('/assets/mocks/data-table.json').subscribe(
            (data: Array<Ingredient>) => {
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.sort = this.sort;
            }
        );
    }

}

