import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { MainLayoutComponent } from '@app/shared/layouts/index';
import { AuthLayoutComponent } from '@app/shared/layouts/index';

import {AuthGuard} from "@app/core/_guards/auth.guard";

// Components
import { LoginComponent } from '@app/components/login/login.component';
import { PasswordRecoveryComponent } from '@app/components/password-recovery/password-recovery.component';

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'password-recovery',
                component: PasswordRecoveryComponent
            }
        ]
    },
    //
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            // Default 
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
            {   // Lazy load DataTables Module
                path: 'data-tables',
                loadChildren: () => import('./components/data-tables/data-tables.module').then(m => m.DataTablesModule)
            },
            {   // Lazy load Forms Module
                path: 'forms',
                loadChildren: () => import('./components/forms/forms.module').then(m => m.FormsModule)
            },
            {   // Lazy load Forms Module
                path: 'tabs',
                loadChildren: () => import('./components/pages/page.module').then(m => m.PageModule)
            },
            {   // Lazy load Forms Module
                path: 'creation',
                loadChildren: () => import('./components/pages/page.routing').then(m => m.PageRoutingModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
