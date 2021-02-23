import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';

import { SharedModule } from '@app/shared/shared.module';
// Components
import { HtmlEditorComponent } from '@app/shared/html-editor/html-editor.component';
import { StretchedLabelsComponent } from './stretched-labels/stretched-labels.component';
import { LanguageOptionsComponent } from './stretched-labels/language-options/language-options.component';
import { IntegrationsComponent } from './stretched-labels/integrations/integrations.component';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { TankListComponent } from '@app/components/pages/tank-list/tank-list.component';
import { NozzleListComponent } from '@app/components/pages/nozzle-list/nozzle-list.component';
import { ProductListComponent } from '@app/components/pages/product-list/product-list.component';
import { ProductCreationComponent } from '@app/components/pages/product-creation/product.creation.component';
import { PumpCreationComponent } from '@app/components/pages/pump-creation/pump.creation.component';
import { PumpListComponent } from '@app/components/pages/pump-list/pump-list.component';
import { LubricantCreationComponent } from '@app/components/pages/lubricant-creation/lubricant.creation.component';
import { LubricantListComponent } from '@app/components/pages/lubricant-list/lubricant-list.component';
import { NozzleCreationComponent } from '@app/components/pages/nozzle-creation/nozzle.creation.component';
import { TankCreationComponent } from '@app/components/pages/tank-creation/tank.creation.component';
import { DynamicTable } from '@app/components/data-tables/dynamic-table/dynamic-table.component';
import { TankSalesComponent } from './stretched-labels/tank-sales/tank-sales.component';
import { LubricantSalesComponent } from './stretched-labels/lubricant-sales/lubricant-sales.component';
import { OilPumpSalesComponent } from './stretched-labels/oil-pump-sales/oil-pump-sales.component';
import { SalaryEntryComponent } from './salary-entry/salary-entry.component';
import { FooterdynamicTableComponent } from '@app/components/data-tables/footerdynamic-table/footerdynamic-table.component';
import { PumpSalesComponent } from './stretched-labels/pump-sales/pump-sales.component';

export const tabsRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'stretched-labels',
                pathMatch: 'full'
            },
            {
                path: 'stretched-labels',
                component: StretchedLabelsComponent,
                data: {
                    title: 'Tabs',
                    icon: 'tab',
                    urls: [
                        { title: 'Stretched-labels' }
                    ]
                }
            },
            {
                path: 'tank-list',
                component: TankListComponent,
                data: {
                    title: 'Tank List',
                    icon: 'tab',
                    urls: [
                        { title: 'Tank-List' }
                    ]
                }
            },
            {
                path: 'tank-creation',
                component: TankCreationComponent,
                data: {
                    title: 'Tank Creation',
                    icon: 'tab',
                    urls: [
                        { title: 'Tank-Creation' }
                    ]
                }
            },
            {
                path: 'pump-list',
                component: PumpListComponent,
                data: {
                    title: 'Pump List',
                    icon: 'tab',
                    urls: [
                        { title: 'Pump-List' }
                    ]
                }
            },
            {
                path: 'pump-creation',
                component: PumpCreationComponent,
                data: {
                    title: 'Pump Creation',
                    icon: 'tab',
                    urls: [
                        { title: 'Pump-Creation' }
                    ]
                }
            },
            {
                path: 'nozzle-list',
                component: NozzleListComponent,
                data: {
                    title: 'Nozzle List',
                    icon: 'tab',
                    urls: [
                        { title: 'Nozzle-List' }
                    ]
                }
            },
            {
                path: 'nozzle-creation',
                component: NozzleCreationComponent,
                data: {
                    title: 'Nozzle Creation',
                    icon: 'tab',
                    urls: [
                        { title: 'Nozzle-Creation' }
                    ]
                }
            },
            {
                path: 'product-list',
                component: ProductListComponent,
                data: {
                    title: 'Product List',
                    icon: 'tab',
                    urls: [
                        { title: 'Product-List' }
                    ]
                }
            },
            {
                path: 'product-creation',
                component: ProductCreationComponent,
                data: {
                    title: 'Tank Creation',
                    icon: 'tab',
                    urls: [
                        { title: 'Tank-Creation' }
                    ]
                }
            },
            {
                path: 'lubricant-list',
                component: LubricantListComponent,
                data: {
                    title: 'Lubricant List',
                    icon: 'tab',
                    urls: [
                        { title: 'Lubricant-List' }
                    ]
                }
            },
            {
                path: 'lubricant-creation',
                component: LubricantCreationComponent,
                data: {
                    title: 'Lubricant Creation',
                    icon: 'tab',
                    urls: [
                        { title: 'Lubricant-Creation' }
                    ]
                }
            },
            {
                path: 'dynmaic-table',
                component: DynamicTable,
                data: {
                    title: 'Dynmaic Table',
                    icon: 'tab',
                    urls: [
                        { title: 'Tank-Creation' }
                    ]
                }
            },
            {
                path: 'footerdynamictable-table',
                component: FooterdynamicTableComponent,
                data: {
                    title: 'Dynmaic Table',
                    icon: 'tab',
                    urls: [
                        { title: 'Tank-Creation1' }
                    ]
                }
            },
            {
                path: 'tank-sales',
                component:TankSalesComponent ,
                data: {
                    title: 'tank sales',
                    icon: 'tab',
                    urls: [
                        { title: 'Tank sales' }
                    ]
                }
            },
            {
                path: 'pump-sales',
                component:PumpSalesComponent ,
                data: {
                    title: 'pump sales',
                    icon: 'tab',
                    urls: [
                        { title: 'Pump sales' }
                    ]
                }
            },
            {
                path: 'lubricant-sales',
                component:LubricantSalesComponent ,
                data: {
                    title: 'Lubricant sales',
                    icon: 'tab',
                    urls: [
                        { title: 'Lubricant sales' }
                    ]
                }
            },
            {
                path: 'oilPump-sales',
                component:OilPumpSalesComponent ,
                data: {
                    title: 'oilPump sales',
                    icon: 'tab',
                    urls: [
                        { title: 'oilPump sales' }
                    ]
                }
            },
            {
                path: 'salary-entry',
                component:SalaryEntryComponent ,
                data: {
                    title: 'salary Entry',
                    icon: 'tab',
                    urls: [
                        { title: 'salary Entry' }
                    ]
                }
            }
        ]
    }
];

@NgModule({
    declarations: [
        StretchedLabelsComponent,
        LanguageOptionsComponent,
        TankListComponent,
        TankCreationComponent,
        NozzleListComponent,
        NozzleCreationComponent,
        ProductListComponent,
        ProductCreationComponent,
        PumpCreationComponent,
        PumpListComponent,
        LubricantListComponent,
        LubricantCreationComponent,
        DynamicTable,
        HtmlEditorComponent,
        IntegrationsComponent,
        TankSalesComponent,
        LubricantSalesComponent,
        OilPumpSalesComponent,
        SalaryEntryComponent,
        FooterdynamicTableComponent,
        PumpSalesComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(tabsRouting)
    ],
    exports: [RouterModule],
    providers: [

    ]
})

export class PageRoutingModule { }
