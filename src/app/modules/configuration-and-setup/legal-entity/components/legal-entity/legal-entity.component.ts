import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { Representative } from 'src/app/modules/shared/models/customer';
import { CountryService } from 'src/app/modules/service/country.service';
import { ProductService } from 'src/app/modules/service/product.service';
import { Product } from 'src/app/modules/shared/models/product';
import { RestApiService } from 'src/app/modules/shared/services/rest-api.service';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { LegalEntityService } from '../../services/legal-entity.service';
interface items {
	label: string;
	icon: string;
	url: any;
}
interface TabItem {
	header: string;
	content: string;
	route: string; // Add route property
}

@Component({
	selector: 'app-legal-entity',
	templateUrl: './legal-entity.component.html',
	styleUrl: './legal-entity.component.scss'
})
export class LegalEntityComponent implements OnInit {
	items: MenuItem[] = [];
	products!: Product[];
	selectedCountryAdvanced: any[] = [];
	filteredCountries: any[] = [];
	countries: any[] = [];
	headerName = 'Create Legal Entity';
	tabItems: TabItem[] = [];

	selectedCity: any = '### ###';
	breadList: any = [];

	home: MenuItem | undefined;
	cardMenu: MenuItem[] = [];

	@ViewChild(Dropdown) dropdown: Dropdown;
	@ViewChild('dropdownRef') dropdownRef: ElementRef;

	legalEntity = new FormGroup({
		entityName: new FormControl('Pune'),
		entityAddress1: new FormControl('Pune City'),
		entityAddress2: new FormControl('Pune City'),
		entityAddress3: new FormControl('Pune City')
	});

	constructor(
		private productService: ProductService,
		private countryService: CountryService,
		fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private restApiService: RestApiService,
		private messageService: MessageService,
		public commonService: CommonService,
		private legalEntityService: LegalEntityService,
		private router: Router
	) {}

	ngOnInit() {
		//this.getTabInfo();
		this.loadLegalEntityTabXML();

		this.productService.getProductsSmall().then((data) => (this.products = data));
		this.countryService.getCountries().then((countries) => {
			this.countries = countries;
		});
	}

	getTabInfo() {
		// let strofbu: any = this.authService.obfuscate(this.frmLogin.controls['username'].value);
		let data: FormData = new FormData();
		data.append('@FORM_NAME@', 'frmLoadConfig');
		data.append('@COMMAND_EVENT@', 'eventLoadConfigLayout');
		data.append('@SESSION_ID@', '1e2r1j1y1b3w1k7g1g1v1hgg1vnu1hlr1i2j17k61ehf1l5r1w9b1d421j1o1tvp1j6b1qa71qy81f321pih1x0p1x1x1pjp1f1c1qvi1qcv1j8r1tvd1iz61d241w8f1l7j1egb17js1hz71hnj1vn81hem1g1n1k6q1b421iyw1e2j');
		data.append('businessUnitID', 'SYSTEM');
		data.append('@USER_LOGON_ID@', '1awj1g9a1nq81n4t1tur1l6t1u9p1l8r1dox1u2g20l71h1g1h1620lf1u2u1dnx1l4j1u9t1l6h1twb1n6p1nry1g8g1ax7');
		data.append('MsgType', 'CONFIG');
		data.append('MsgSubType', 'LEGAL ENTITY');
		data.append('FunctionName', 'CREATE');
		data.append('MOP', 'CONFIG');
		data.append('TransactionType', 'CFG');

		data.append(
			'paramNmSeq',
			'1lqy1p3p1snp1lz11q3i1tv31pb81owc1nxl1lyb1oi41jjx1gzu1kc91iej1b4m1dia1d401k701hm91jsw1bbr1goi1biw1q401obb1nqk1l6t1nip1jr01iki1kqf1lcs1rac1pvz1jf01eau1cbg1dia1oiw1u261rgv1j731l5p1kxi1e8o1i6c1v8u1rjb1kna1inw1jnl1t331y0y1zsp1mkg1v9i1wmt1rc61cbg1bbr16kf1ai31baf1g8m1oqd1kzo1iet1jey1nkf1j7j1njj1jec1ifd1kze1oqx1g941bbr1aj716kf1baf1c9u1ra01wnd1v941mke1zt11y0s1t331jjx1iki1kjc1rh31v9s1i9m1eau1l1k1l7l1j7z1rjj1u341ok61dgc1c9u1e8o1jea1pyn1rbu1leq1kuf1inw1juq1nl91l6h1nrm1odj1q4u1bhi1glo1baf1jsu1hn11k761d261dgc1b3c1ifn1kg51h2s1jnl1oky1lzv1nyt1oz61pcq1tvz1q5c1lz51sq11p611lt0'
		);
		data.append('FPRINT', '1abm19c51abc19xe19q719x81abq19bt1abg');

		this.restApiService.post(data).subscribe(
			(data: any) => {
				// Success resp
				// let data2: FormData = new FormData();
				// data2.append('@FORM_NAME@','frmVALogin');
				// data2.append('@COMMAND_EVENT@','Submit');
				// data2.append('statusCd302','302')
			},
			(error) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servlet Exception! Please contact PAYplus for CLS Administrator.' });
			}
		);
	}

	loadLegalEntityTabXML() {
		let url = '/assets/demo/data/legal-entity-tab.xml';
		this.legalEntityService.getTabData(url).subscribe(
			(response: any) => {
				const data = this.commonService.xmlToJson(response.body); // Capture JSON data of xml response
				/* Prepare Tab Structure for Legal entity */
				data.then((res) => {
					if (res.CONFIG.BUTTONS.B.length) {
						for (let tab = 1; tab < res.CONFIG.BUTTONS.B.length; tab++) {
							this.items.push({
								label: res.CONFIG.BUTTONS.TAB[tab].$.CAPTION,
								icon: res.CONFIG.BUTTONS.TAB[tab].$.CAPTION,
								url: ''
							});
						}
					} else {
						this.items.push({
							label: res.CONFIG.BUTTONS.B.$.CAPTION,
							icon: res.CONFIG.BUTTONS.B.$.CAPTION,
							url: ''
						});
					}

					for (let tab = 1; tab < res.CONFIG.TABS.TAB.length; tab++) {
						this.tabItems.push({
							header: res.CONFIG.TABS.TAB[tab].$.CAPTION,
							content: res.CONFIG.TABS.TAB[tab].$.CAPTION,
							route: ''
						});
					}
					this.router.navigate(['/configuration-and-setup/legal-entity/legal-entity-main']);
				});
			},
			(error) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servlet Exception! Please contact PAYplus for CLS Administrator.' });
			}
		);
	}

	onTabChange(event: any, tabItem?: TabItem) {
		let tabName: any = event.originalEvent.currentTarget.innerText;
		switch (tabName) {
			case 'Main':
				this.router.navigate(['/configuration-and-setup/legal-entity/legal-entity-main']);
				break;
			case 'Error':
				this.router.navigate(['/configuration-and-setup/legal-entity/error']);
				break;
			default:
				this.router.navigate(['/configuration-and-setup/legal-entity/legal-entity-main']);

				break;
		}
	}

	filterCountry(event: any) {
		const filtered: any[] = [];
		const query = event.query;
		for (let i = 0; i < this.countries.length; i++) {
			const country = this.countries[i];
			if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(country);
			}
		}

		this.filteredCountries = filtered;
	}

	openDropdown() {
		if (this.dropdown.overlayVisible) return;

		this.dropdown.show();
	}

	closeDropdown() {
		if (!this.dropdown.overlayVisible) return;

		this.dropdown.hide();
	}
	onSort() {
		this.updateRowGroupMetaData();
	}

	updateRowGroupMetaData() {}
	expandAll() {}
}
