import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { Representative } from 'src/app/modules/api/customer';
import { Product } from 'src/app/modules/api/product';
import { CountryService } from 'src/app/modules/service/country.service';
import { ProductService } from 'src/app/modules/service/product.service';
interface City {
	label: string;
	icon: string;
	url: any;
}
@Component({
	selector: 'app-legal-entity',
	templateUrl: './legal-entity.component.html',
	styleUrl: './legal-entity.component.scss'
})
export class LegalEntityComponent implements OnInit {
	items: MenuItem[] = [];
	representatives: Representative[] = [];
	products!: Product[];
	selectedCountryAdvanced: any[] = [];
	filteredCountries: any[] = [];
	countries: any[] = [];
	selectedCity: any = '### ###';
	breadList: any = [];
	breaditems: MenuItem[] | undefined;

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
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.items = [
			{
				label: 'Approve',
				icon: 'pi pi-external-link',
				url: 'http://angular.io'
			},
			{
				label: 'Reject',
				icon: 'pi pi-bookmark',
				routerLink: ['/theming']
			},
			{ label: 'Next', icon: 'pi pi-bookmark', routerLink: ['/theming'] },
			{ label: 'Prev', icon: 'pi pi-bookmark', routerLink: ['/theming'] }
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
		this.activatedRoute.data.subscribe((d) => {
			console.log(d['breadcrumb']); // ['home']
			this.breadList = d['breadcrumb'];
		});
		this.breaditems = [{ label: this.breadList[0] }, { label: this.breadList[1] }];

		this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
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
