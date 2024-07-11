import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { PayplusTranslateFrLoaderService } from 'src/app/modules/shared/services/payplus-translate-fr-loader.service';
import { LayoutService } from '../../services/app.layout.service';
import { MenuService } from '../../services/app.menu.service';

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
	moduleValue;

	languages = [
		{ name: 'English', lang: 'en' },
		{ name: 'French', lang: 'fr' }
	];

	currentLang = 'fr';
	selectedLang: any;
	visible: boolean = false;

	isDisplay: boolean = true;

	position: string = 'top';

	// isSelection: boolean = true;

	selections: selection[];
	viewTypes: any[] = [];
	sessionTypes: any[] = [];

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
		public commonService: CommonService
	) {}
	onLangChange(currentLang: string) {
		if (currentLang == 'fr') {
			this.setTranslateLoader(PayplusTranslateFrLoaderService);
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

		this.menuService.selectedViewType.subscribe((data) => {
			this.viewType = data.name;
		});
		this.menuService.sessionType.subscribe((data) => {
			this.sessionType = data.name;
		});
		this.menuService.moduleValue.subscribe((data) => {
			this.moduleValue = data;
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
}
