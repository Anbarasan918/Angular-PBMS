import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-creation',
    templateUrl: './product.creation.component.html',
    styleUrls: ['./product.creation.component.scss']
})
export class ProductCreationComponent {
    public step: number;

    constructor(private router: Router) {
        this.step = 0;
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
        var tankUrl = 'creation/product-list';
        this.router.navigateByUrl(tankUrl);
    }
}
