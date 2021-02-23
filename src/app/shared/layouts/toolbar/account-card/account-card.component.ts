import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "@app/core/services/user.service";
import { ThemingService } from '@app/core/services/theming.service';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-account-card',
    templateUrl: './account-card.component.html',
    styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
    currentTheme: string;
    currentUserSubscription: Subscription;
    name$;
    name: string;
    currentUser: any; 

    constructor(private theming: ThemingService,private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.currentTheme = this.theming.get();

        this.name$ = this.userService.name$.subscribe(aName => this.name = aName); 
 
        if(!this.userService.currentUser)
            return;

        this.currentUserSubscription = this.userService.currentUser.subscribe(user => { 
            if(user){
                this.name =user.name; 
                this.currentUser = user; 
            } 
        });
    }

    public changeTheme(themeName: string): void {
        this.currentTheme = themeName;
        this.theming.set(themeName);
    }
}
