import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { LoggerService } from '@app/core/services/logger.service';
import { UserService } from '@app/core/services/user.service';
import {SpinnerService} from "@app/core/services/spinner.service";

import { FormControlHelper } from '@app/core/helpers/index';
import { loginValidation } from '@app/models/form-validations/index';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    // Properties
    public loginForm: FormGroup;
    public loginValidationModel: any;
    public waiting: boolean;
    public hidePassword: boolean;

    isInvalid: boolean;
    isLogout: boolean;
    submitted = false;
    errorMessage:string;
    model: any = {
        username: '',
        password: '',
        remembered: false
    };

    returnUrl = '/';

    constructor(
        private router: Router,
        private logger: LoggerService,
        private userService:UserService,
        private spinnerService: SpinnerService
    ) {
        this.loginValidationModel = loginValidation;
        this.hidePassword = true;
    }

    ngOnInit() {
        const formGroupObj = FormControlHelper.generateFormControls(this.loginValidationModel);
        if (formGroupObj) {
            this.loginForm = new FormGroup(formGroupObj);
        } else {
            this.logger.error(new Error('Error generating the form modal & validations'));
        }

    }

    public onSubmit(): void {
        // if (this.loginForm.valid) {
        //     this.waiting = true;

        //     this.router.navigateByUrl('forms/simple-form');
        // }

        this.submitted = true; 
        this.spinnerService.toggleSpinner(true);
        this.userService.login(this.loginForm.value).subscribe(
            user => { 
                if (user) { 
                    this.spinnerService.toggleSpinner(false);
                    this.returnUrl = 'creation/tank-list'; 
                    this.router.navigateByUrl(this.returnUrl);
                } else {
                    this.isLogout = false; 
                    this.isInvalid = true;
                    this.spinnerService.toggleSpinner(false);
                } 
            }, 
            err => { 
                console.log(err)
                if(err && err.error && err.error.description){
                    this.errorMessage=err.description;
                    this.isLogout = false; 
                    this.isInvalid = true; 
                    console.log(this.errorMessage);
                    console.log(err);
                    this.spinnerService.toggleSpinner(false);
                }
                 
            }
        );

    }
}
