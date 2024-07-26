import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';

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

	@ViewChild(Dropdown) dropdown: Dropdown;
	@ViewChild('dropdownRef') dropdownRef: ElementRef;

	ngOnInit() {}
	openDropdown() {
		if (this.dropdown.overlayVisible) return;

		this.dropdown.show();
	}

	closeDropdown() {
		if (!this.dropdown.overlayVisible) return;

		this.dropdown.hide();
	}
}
