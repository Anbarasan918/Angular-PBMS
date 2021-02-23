import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";
import { PageCount, YtResponse } from "@app/models/YtResponse";
import AppUtills from "@app/core/helpers/app-utills"

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import {
    ExcelHelper,
    DataTableHelper
} from '@app/core/helpers/index';

import { DeviceHelper } from '@app/core/helpers/index';
import { AssignToComponent } from '@app/shared/toasts/index';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
    selector: 'app-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTable implements OnInit, OnChanges {
    public dataSource: MatTableDataSource<any>;
    public isMobile: boolean;
    public selection: SelectionModel<any>;

    @Input() displayedColumns: any[];
    @Input() gridData: string[];
    @Input() creationUrl: string;
    @Input() dataTableConfig: any;

    page: any;
    totalPages: any;
    reponse: YtResponse;
    filter: any = {};
    displayedColumnCodes: any[] = [];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient,
        private toast: MatSnackBar,
        private router: Router,
        private spinnerService: SpinnerService,
        private dataService: DataService) {
        this.isMobile = DeviceHelper.isMobile();
        this.selection = new SelectionModel<any>(true, []);
    }

    ngOnInit() {
        
    } 

    ngOnChanges(changes: SimpleChanges) {
        this.dataSource = new MatTableDataSource(this.gridData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;  
        this.displayedColumnCodes=[];
        this.displayedColumns.forEach(element => {
            this.displayedColumnCodes.push(element.code);
        });
      }

    public createTank() {
        var tankUrl = this.dataTableConfig.creationUrl;
        this.router.navigateByUrl(tankUrl);
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = DataTableHelper.applyFilter(filterValue);
    }

    public isAllSelected(): boolean {
        return DataTableHelper.isAllSelected(this.selection, this.dataSource);
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    public masterToggle(): void {
        DataTableHelper.toggleSelection(this.selection, this.dataSource);
    }

    public assignTo() {
        this.toast.openFromComponent(AssignToComponent, {
            duration: 5000,
            data: this.selection
        });
    }

    public printResult(element) {

        return JSON.stringify(element);
    }

    public exportToExcel(name: string): void {
        if (this.selection.selected.length > 0) {
            const excelHelper = new ExcelHelper(XLSX, saveAs);
            excelHelper.exportAsExcelFile(this.selection.selected, name);
        } else {
            // TODO: changes toast component
            this.toast.openFromComponent(AssignToComponent, {
                duration: 5000,
                data: this.selection
            });
        }
    }


    getProds(page: number = 1, size: number = 5) {

        this.spinnerService.toggleSpinner(true);

        this.dataService.getAllTanks(+page, +size, this.filter)
            .subscribe(page => {
                this.page = AppUtills.parseResponse(page);
                let totalCount = page.totalCount;
                page.totalCount = Math.ceil(totalCount / PageCount.count);
                this.reponse = page;
                this.spinnerService.toggleSpinner(false)
            });
    }
}
