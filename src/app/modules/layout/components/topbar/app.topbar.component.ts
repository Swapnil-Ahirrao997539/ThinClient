import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { LayoutService } from '../../services/app.layout.service';
import { MenuService } from '../../services/app.menu.service';
import { AuthService } from 'src/app/auth/auth.service';

interface selection {
	name: string;
	code: string;
}

export interface Locale {
	lang: string;
	data: Object;
}
@Component({
	selector: 'app-topbar',
	templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
	items!: MenuItem[];
	viewType: any;
	sessionType;
	moduleValue = 'Processing';
	dashboardButtonName: any = 'Main Application View';
	selectedSessionTypeForDashboard: any = 'cls1';
	checked: boolean = false;

	currentLang = 'fr';
	selectedLang: any;
	visible: boolean = false;

	isDisplay: boolean = true;

	position: string = 'top';

	// isSelection: boolean = true;

	selections: selection[];
	viewTypes: any[] = [];
	sessionTypes: any[] = [];

	profileItems: MenuItem[] | undefined;

	selectedSelections: any = 'Processing';

	selectedViewType: any = 'individual';

	selectedSessionType: any = 'cls1';

	showDashboardEntity: boolean = false;

	@ViewChild('menubutton') menuButton!: ElementRef;

	@ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

	@ViewChild('topbarmenu') menu!: ElementRef;

	sidebarVisible2: boolean = false;

	constructor(
		public layoutService: LayoutService,
		public menuService: MenuService,
		public router: Router,
		public translate: TranslateService,
		public commonService: CommonService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		if (this.router.url == '/dashboard') {
			// this.showDashboardEntity = true;
			this.layoutService.onMenuToggle();
			this.dashboardButtonName = 'Main Application View';
			this.showDashboardEntity = !this.showDashboardEntity;

			//this.layoutService.isSelection = false;
		} else {
			this.dashboardButtonName = 'Dashboard View';
			// this.showDashboardEntity = false;
			//this.layoutService.isSelection = true;
		}
		// this.layoutService.gridHeader.subscribe((data) => {
		// 	if (data.subStrHeader == 'Dashboard View') {
		// 		this.showDashboardEntity = true;
		// 		this.layoutService.onMenuToggle();
		// 		//this.layoutService.isDisplayDashboard = false;
		// 	} else {
		// 		this.showDashboardEntity = false;

		// 		//this.layoutService.isDisplayDashboard = true;
		// 	}
		// });
		// Pass default selections to menu service

		this.profileItems = [
			{
				label: localStorage.getItem('username'),
				items: [
					{
						label: 'Change Password',
						icon: 'pi pi-lock',
						command: () => {
							this.refresh();
						}
					},
					{
						label: 'Logout	',
						icon: 'pi pi-power-off',
						command: () => {
							this.authService.logout();
						}
					}
				]
			}
		];

		this.selections = [
			{ name: 'Processing', code: 'Processing' },
			{ name: 'User Admin', code: 'User Admin' }
		];
		this.viewTypes = [
			{ name: 'Aggregate', code: 'aggregate' },
			{ name: 'Individual', code: 'individual' }
		];
		this.sessionTypes = [
			{ name: 'CLS1', code: 'cls1' },
			{ name: 'CLSNET', code: 'clsnet' },
			{ name: 'LCH', code: 'lch' },
			{ name: 'CLSNOW', code: 'clsnow' }
		];
	}

	showDialog(position: string) {
		this.position = position;
		this.visible = true;
	}

	changeSelection(selectedValue) {
		this.menuService.moduleValue.next(selectedValue);
		if (selectedValue == 'Processing') {
			this.selectedSessionType = 'cls1';
		}
		this.selectedSessionTypeForDashboard = this.selectedSessionType;
		// this.menuService.selectedViewType.next(this.selectedViewType);
		// this.menuService.sessionType.next(this.selectedSessionType);
	}

	changeDashboard(selectedValue) {}

	backToMainApplicationView(checkValue) {
		debugger;
		this.showDashboardEntity = !this.showDashboardEntity;
		if (this.showDashboardEntity) {
			this.dashboardButtonName = 'Main Application View';
			this.router.navigate(['/dashboard']);
		} else {
			this.dashboardButtonName = 'Dashboard View';
			this.router.navigate(['/configuration-and-setup/blank']);
		}
		// this.selectedSelections = 'Processing';
		this.layoutService.onMenuToggle();
	}

	refresh() {
		window.location.reload();
	}
}
