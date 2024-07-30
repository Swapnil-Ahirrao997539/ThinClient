import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { CommonService } from '../../services/common.service';

@Component({
	selector: 'app-subheader-toolbar',
	// standalone: true,
	// imports: [],
	templateUrl: './subheader-toolbar.component.html',
	styleUrl: './subheader-toolbar.component.scss'
})
export class SubheaderToolbarComponent implements OnInit {
	items: MenuItem[] = [];
	selectedCity: any = '### ###';
	@Input() headerName: any;
	@Input() actionItems: MenuItem[];
	incomingFormData: any;
	incomingFormValidity: any;

	@ViewChild(Dropdown) dropdown: Dropdown;
	@ViewChild('dropdownRef') dropdownRef: ElementRef;
	constructor(public commonService: CommonService) {}

	ngOnInit() {
		this.commonService.formObject.subscribe((data) => {
			this.incomingFormData = data;
		});
	}

	onActionClicked(event: any) {
		let action = event.currentTarget.innerText.split('\n');
		if (action[0] == 'Create') {
			if (this.incomingFormData) {
				// if (this.incomingFormData.status == 'INVALID') {
				// 	alert('Form Validations invalid...something went wrong!!!');
				// 	this.commonService.returnValidation.next(this.incomingFormData.status);
				// } else {
				// 	alert('Form Validations Correct...Go ahead!!!');
				// }
				this.commonService.returnValidation.next(this.incomingFormData.status);
			} else {
				alert('Form Validations invalid...something went wrong!!!');
				this.commonService.returnValidation.next(null);
			}
		}
	}
	openDropdown() {
		if (this.dropdown.overlayVisible) return;

		this.dropdown.show();
	}

	closeDropdown() {
		if (!this.dropdown.overlayVisible) return;

		this.dropdown.hide();
	}
}
