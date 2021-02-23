import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
// Components
import { SimpleFormComponent } from '@app/components/forms/index';
import { ValidationFormComponent } from './validation-form/validation-form.component';
import { ProductTankComponent } from './validation-form/product-tank/product-tank.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { RatechangeEntryComponent } from './ratechange-entry/ratechange-entry.component';
import { AttendanceEntryComponent } from './attendance-entry/attendance-entry.component';

export const formsRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'simple-form',
                pathMatch: 'full'
            },
            {
                path: 'simple-form',
                component: SimpleFormComponent,
                data: {
                    title: 'Forms',
                    icon: 'text_fields',
                    urls: [
                        { title: 'Simple form' }
                    ]
                }
            },
            {
                path: 'validation-form',
                component: ValidationFormComponent,
                data: {
                    title: 'Forms',
                    icon: 'text_fields',
                    urls: [
                        { title: 'Validation form' }
                    ]
                }
            },
            {
                path: 'expense-entry',
                component: ExpenseEntryComponent,
                data: {
                    title: 'Forms',
                    icon: 'text_fields',
                    urls: [
                        { title: 'expense entry' }
                    ]
                }
            },
            {
                path: 'ratechange-entry',
                component: RatechangeEntryComponent,
                data: {
                    title: 'Forms',
                    icon: 'text_fields',
                    urls: [
                        { title: 'ratechange entry' }
                    ]
                }
            },
            {
                path: 'attendance-entry',
                component: AttendanceEntryComponent,
                data: {
                    title: 'Forms',
                    icon: 'text_fields',
                    urls: [
                        { title: 'attendance entry' }
                    ]
                }
            }
            
        ]
    }
];

@NgModule({
    declarations: [
        SimpleFormComponent,
        ValidationFormComponent,
        ProductTankComponent,
        ExpenseEntryComponent,
        RatechangeEntryComponent,
        AttendanceEntryComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(formsRouting)
    ],
    exports: [RouterModule]
})
export class FormsRoutingModule { }
