import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-remove-item',
	templateUrl: './dialog-remove-item.component.html'
})
export class DialogRemoveItemComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public item: any) { }

}
