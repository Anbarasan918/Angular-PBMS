import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from "@angular/router";
import { DialogLogoutComponent } from '@app/shared/dialogs/dialog-logout/dialog-logout.component';
import {UserService} from "@app/core/services/user.service";

@Component({
    selector: 'app-logout-button',
    templateUrl: './logout-button.component.html'
})
export class LogoutButtonComponent {

    constructor(private userService: UserService,private dialog: MatDialog, private router: Router) { }

    public openLogoutDialog(): void {
        // Open logout dialog
        const logoutDialog = this.dialog.open(DialogLogoutComponent, {
            width: '300px'
        });

        logoutDialog.afterClosed().subscribe(result => {
            if (result) {
                // User click on logout session button
                console.log('Call a session service to logout');
                this.logout();
            }
        });

    }

    logout() {
        this.userService.logout(); 
        this.router.navigate(['/login'], {queryParams: {logout: 'true'}} );
    }
}
