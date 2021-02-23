import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";
import { PageCount, YtResponse } from "@app/models/YtResponse";
import AppUtills from "@app/core/helpers/app-utills";

@Component({
    selector: 'app-tank-creation',
    templateUrl: './tank.creation.component.html',
    styleUrls: ['./tank.creation.component.scss']
})
export class TankCreationComponent implements OnInit {
    public step: number;
    tank: any = {};
    filter: any = {};
    products = [];

    constructor(private router: Router,
        private spinnerService: SpinnerService,
        private dataService: DataService) {
        this.step = 0;
    }

    ngOnInit() {
        this.getProds();
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }


    goToList() {
        var tankUrl = 'creation/tank-list';
        this.router.navigateByUrl(tankUrl);
    }

    onSubmit() {
        this.spinnerService.toggleSpinner(true);

        this.dataService.createTank(this.tank)
            .subscribe(page => {
                this.spinnerService.toggleSpinner(false);
                this.goToList();
            }, (error) => {
                this.spinnerService.toggleSpinner(true);
            });
    }

    getProds(page: number = 1, size: number = 5) {

        this.spinnerService.toggleSpinner(true);

        this.dataService.getAllProducts(+page, +size, this.filter)
            .subscribe(page => {

                let totalCount = page.totalCount;
                page.totalCount = Math.ceil(totalCount / PageCount.count);
                this.products = page.response;
                this.spinnerService.toggleSpinner(false)
            }, (error) => {
                this.spinnerService.toggleSpinner(false);
            });
    }
}
