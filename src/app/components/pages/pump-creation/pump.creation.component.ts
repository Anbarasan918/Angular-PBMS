import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/core/services/data/data.service';
import { SpinnerService } from "@app/core/services/spinner.service";

@Component({
    selector: 'app-pump-creation',
    templateUrl: './pump.creation.component.html',
    styleUrls: ['./pump.creation.component.scss']
})
export class PumpCreationComponent implements OnInit {
    public step: number;
    nozzle: any = {};
    filter: any = {};
    tankList: any = [];

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
        var tankUrl = 'creation/pump-list';
        this.router.navigateByUrl(tankUrl);
    }
    onSubmit() {
        this.spinnerService.toggleSpinner(true);

        this.dataService.createPump(this.nozzle)
            .subscribe(page => {
                this.spinnerService.toggleSpinner(false);
                this.goToList();
            }, (error) => {
                this.spinnerService.toggleSpinner(true);
            });
    }

    getProds(page: number = 1, size: number = 5) {

        this.spinnerService.toggleSpinner(true);

        this.dataService.getAllTanks(+page, +size, this.filter)
            .subscribe(page => {
                let totalCount = page.totalCount;
                this.tankList = page.entityData;
                this.spinnerService.toggleSpinner(false)
            }, (error) => {
                this.spinnerService.toggleSpinner(false);
            });
    }

}
