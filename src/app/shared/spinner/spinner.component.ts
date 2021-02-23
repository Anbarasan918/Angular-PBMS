import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { AppSettings } from '@app/core/settings/index';
import {SpinnerService} from "@app/core/services/spinner.service";


@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnInit, OnDestroy {
    public isSpinnerVisible = true;

    @Input() public backgroundColor = AppSettings.spinner.color;

    constructor(private router: Router,private spinnerService: SpinnerService) { }

    ngOnInit(): void {
        this.router.events.subscribe(
            event => {
                if (event instanceof NavigationStart) {
                    this.isSpinnerVisible = true;
                } else if (event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError) {
                    this.isSpinnerVisible = false;
                }
            },
            () => {
                this.isSpinnerVisible = false;
            });

            this.spinnerService.isSpinnerPresent().subscribe(isLoading => { 
                if(isLoading)
                this.isSpinnerVisible = true;
                else if(!isLoading)
                this.isSpinnerVisible = false;
              });   

    }

    ngOnDestroy(): void {
        this.isSpinnerVisible = false;
    }
 
     
}
