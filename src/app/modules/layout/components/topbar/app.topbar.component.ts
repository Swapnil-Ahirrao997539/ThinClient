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
	onLangChange(currentLang: string) {
		if (currentLang == 'fr') {
			// this.setTranslateLoader(PayplusTranslateFrLoaderService);
			this.translate.getTranslation('fr');
		}
		if (currentLang == 'en') {
			this.commonService.langVar.next(currentLang);
		}

		this.translate.use(currentLang);
	}

	// Method to set a new loader class dynamically
	setTranslateLoader(loaderClass: any) {
		debugger;
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: loaderClass
			}
		});
	}

	ngOnInit(): void {
		// if(this.router.url == '/dashboard') {
		//    this.layoutService.isSelection = false;
		// } else {
		//     this.layoutService.isSelection = true;
		// }
		// this.layoutService.gridHeader.subscribe(data => {
		//     if(data.subStrHeader == 'Dashboard View') {
		//          debugger
		//         this.layoutService.isDisplayDashboard = false;
		//     } else {
		//         debugger
		//         this.layoutService.isDisplayDashboard = true;

		//     }
		//  })
		this.profileItems = [
			{
				label: localStorage.getItem('username'),
				items: [
					{
						label: 'Refresh',
						icon: 'pi pi-refresh',
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
		this.menuService.selectedViewType.subscribe((data) => {
			if (data) {
				this.viewType = data.name;
			}
		});
		this.menuService.sessionType.subscribe((data) => {
			if (data) {
				this.sessionType = data.name;
			}
		});
		this.menuService.moduleValue.subscribe((data) => {
			if (data) {
				this.moduleValue = data;
			}
		});
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
			{ name: 'SDS', code: 'sds' },
			{ name: 'CLSNET', code: 'clsnet' },
			{ name: 'LCH', code: 'lch' },
			{ name: 'CLSNOW', code: 'clsnow' }
		];
	}

	showDialog(position: string) {
		this.position = position;
		this.visible = true;
	}

	refresh() {
		window.location.reload();
	}
}
