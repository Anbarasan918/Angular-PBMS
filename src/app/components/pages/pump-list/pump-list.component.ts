import { Component, OnInit, ViewChild } from '@angular/core';
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
import AppUtills from "@app/core/helpers/app-utills"; 
import { DeviceHelper } from '@app/core/helpers/index'; 

@Component({
    selector: 'app-pump-list',
    templateUrl: './pump-list.component.html',
    styleUrls: ['./pump-list.component.scss']
})
export class PumpListComponent implements OnInit {

    public displayedColumns: any[];
    public isMobile: boolean;
    gridData: any[];
    page: any;
    totalPages: any;
    reponse: YtResponse;
    filter: any = {};
    dataLoaded: boolean = false;
    dataTableConfig:any={};

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient,
        private toast: MatSnackBar,
        private router: Router,
        private spinnerService: SpinnerService,
        private dataService: DataService) {
        this.isMobile = DeviceHelper.isMobile(); 
        this.displayedColumns = [{"label":'Pump Name',"code":"name"},{"label":'Tank',"code":"tankId"}];
    }

    ngOnInit() { 
        this.getProds();
        this.initializeDataGridConfig();
    }

    public createTank() {
        var tankUrl = 'creation/pump-creation';
        this.router.navigateByUrl(tankUrl);
    }


    getProds(page: number = 1, size: number = 5) {

        this.dataTableConfig.isLoading=true;
        this.dataService.getAllPumps(+page, +size, this.filter)
            .subscribe(page => {
                this.page = AppUtills.parseResponse(page);
                let totalCount = page.totalCount;
                page.totalCount = Math.ceil(totalCount / PageCount.count);
                this.reponse = page.entityData;
                this.gridData = page.entityData;
                this.dataLoaded = true;
                this.dataTableConfig.isLoading=false;
            }, (error) => {
                this.dataTableConfig.isLoading=false;
                this.dataTableConfig.isError=false;
            });
    }

    initializeDataGridConfig(){
        this.dataTableConfig.creationUrl='creation/pump-creation';
        this.dataTableConfig.emptyStateTitle='No Pumps Found';
        this.dataTableConfig.emptyStateSubTitle='Please Create a pump to view here';
        this.dataTableConfig.errorMsg='Oops... We have trouble getting ur data. Pls hold on..';
    }


}
