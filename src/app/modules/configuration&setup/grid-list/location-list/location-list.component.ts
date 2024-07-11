import { Component } from '@angular/core';
import { PayplusGridComponent } from '../../../shared/components/payplus-grid/payplus-grid.component';
import { LayoutService } from 'src/app/modules/layout/services/app.layout.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-location-list',
	// standalone: true,
	// imports: [PayplusGridComponent],
	templateUrl: './location-list.component.html',
	styleUrl: './location-list.component.scss'
})
export class LocationListComponent {
	gridHeader: any;
	dt = ['Location', 'Legal Entity'];
	items: MenuItem[] | undefined;
	public data;

	home: MenuItem | undefined;
	constructor(
		private layoutService: LayoutService,
		public route: ActivatedRoute
	) {}
	ngOnInit() {
		this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
		this.route.data.subscribe((data) => (this.data = data));
		// this.layoutService.items = this.data;
		this.items = [
			// {
			//   label: '',
			//   routerLink:''
			// },
			{
				label: this.data.breadcrumb,
				routerLink: ''
			}
		];
	}

	chipClicked() {}
}
