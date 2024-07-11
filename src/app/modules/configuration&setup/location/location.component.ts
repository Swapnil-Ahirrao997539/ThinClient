import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, OverlayService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { Representative } from 'src/app/modules/api/customer';
import { Product } from 'src/app/modules/api/product';
import { CountryService } from 'src/app/modules/service/country.service';
import { ProductService } from 'src/app/modules/service/product.service';
import { LayoutService } from 'src/app/modules/layout/services/app.layout.service';
interface City {
	label: string;
	icon: string;
	url: any;
}

interface City1 {
	name: string;
	code: string;
}
@Component({
	selector: 'app-location',
	// standalone: true,
	// imports: [],
	templateUrl: './location.component.html',
	styleUrl: './location.component.scss'
})
export class LocationComponent {
	items: City[] = [];
	breaditems: MenuItem[] | undefined;

	home: MenuItem | undefined;

	representatives: Representative[] = [];
	products!: Product[];
	selectedCountryAdvanced: any[] = [];
	filteredCountries: any[] = [];
	countries: any[] = [];
	selectedCity: any = '### ###';

	cities: City1[] | undefined;
	driledData: any = [];
	currentData: any;
	cardMenu: MenuItem[] = [];
	cities1: City1[] | undefined;
	currentIndex: number = 0;
	disableNext: Boolean = false;
	disablePrev: Boolean = false;
	breadList: any = [];
	// @ViewChild('splitButton') splitButton: ElementRef;
	@ViewChild(Dropdown) dropdown: Dropdown;
	@ViewChild('dropdownRef') dropdownRef: ElementRef;

	legalEntity = new FormGroup({
		entityName: new FormControl(),
		entityAddress1: new FormControl(),
		entityAddress2: new FormControl(),
		entityAddress3: new FormControl()
	});

	constructor(
		private productService: ProductService,
		private countryService: CountryService,
		fb: FormBuilder,
		private overlayService: OverlayService,
		private layoutService: LayoutService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.activatedRoute.data.subscribe((d) => {
			console.log(d['breadcrumb']); // ['home']
			this.breadList = d['breadcrumb'];
		});

		this.items = [
			{ label: 'Approve', icon: 'pi pi-external-link', url: 'http://angular.io' },
			{ label: 'Reject', icon: 'pi pi-bookmark', url: ['/theming'] }
		];

		this.breaditems = [{ label: this.breadList[0] }, { label: this.breadList[1] }];

		this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };

		this.cities = [
			{ name: '###,###,###,##', code: 'NY' },
			{ name: 'Rome', code: 'RM' },
			{ name: 'London', code: 'LDN' },
			{ name: 'Istanbul', code: 'IST' },
			{ name: 'Paris', code: 'PRS' }
		];

		this.cities1 = [
			{ name: 'DD MM YYYY', code: 'NY' },
			{ name: 'Rome', code: 'RM' },
			{ name: 'London', code: 'LDN' },
			{ name: 'Istanbul', code: 'IST' },
			{ name: 'Paris', code: 'PRS' }
		];

		this.productService.getProductsSmall().then((data) => (this.products = data));
		this.countryService.getCountries().then((countries) => {
			this.countries = countries;
		});
		this.cardMenu = [
			{
				label: 'Create',
				icon: 'pi pi-fw pi-check'
			},
			{
				label: 'Update',
				icon: 'pi pi-fw pi-refresh'
			},
			{
				label: 'Delete',
				icon: 'pi pi-fw pi-trash'
			}
		];

		this.representatives = [
			{ name: 'Amy Elsner', image: 'amyelsner.png' },
			{ name: 'Anna Fali', image: 'annafali.png' },
			{ name: 'Asiya Javayant', image: 'asiyajavayant.png' },
			{ name: 'Bernardo Dominic', image: 'bernardodominic.png' },
			{ name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
			{ name: 'Ioni Bowcher', image: 'ionibowcher.png' },
			{ name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
			{ name: 'Onyama Limba', image: 'onyamalimba.png' },
			{ name: 'Stephen Shaw', image: 'stephenshaw.png' },
			{ name: 'XuXue Feng', image: 'xuxuefeng.png' }
		];

		this.driledData = JSON.parse(localStorage.getItem('drillData'));
		let g = this.driledData.length;
		this.disablePrev = true;

		this.bindData(this.driledData[0]);
	}

	next() {
		if (this.currentIndex < this.driledData.length - 1) {
			this.currentIndex++;
			this.currentData = this.driledData[this.currentIndex];
			this.bindData(this.currentData);
			this.disablePrev = false;
		} else {
			this.disableNext = true;
			this.disablePrev = false;
		}
	}

	prev() {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this.currentData = this.driledData[this.currentIndex];
			this.bindData(this.currentData);
			this.disableNext = false;
		} else {
			this.disablePrev = true;
			this.disableNext = false;
		}
	}

	bindData(dt) {
		// this.legalEntity.controls.setValue(this.currentData)
		this.legalEntity.controls['entityName'].setValue(dt.name);
		this.legalEntity.controls['entityAddress1'].setValue(dt.price);
		this.legalEntity.controls['entityAddress2'].setValue(dt.price);
		this.legalEntity.controls['entityAddress3'].setValue(dt.price);
	}

	openDropdown() {
		if (this.dropdown.overlayVisible) return;

		this.dropdown.show();
	}

	closeDropdown() {
		if (!this.dropdown.overlayVisible) return;

		this.dropdown.hide();
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
	onSort() {
		this.updateRowGroupMetaData();
	}

	updateRowGroupMetaData() {}

	expandAll() {}
}
