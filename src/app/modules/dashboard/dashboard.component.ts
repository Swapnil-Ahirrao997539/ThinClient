import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../shared/models/product';
import { ProductService } from '../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/modules/layout/services/app.layout.service';
import { Router } from '@angular/router';
interface Map {
	name: string;
	code: string;
}
@Component({
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
	items!: MenuItem[];
	barData: any;
	pieData: any;

	products!: Product[];

	chartData: any;

	chartOptions: any;
	barOptions: any;
	pieOptions: any;

	maps: Map[] | undefined;

	subscription!: Subscription;
	selectedMap: any;

	constructor(
		private productService: ProductService,
		public layoutService: LayoutService,
		private router: Router
	) {
		this.layoutService.isDisplay = true;
		this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe((config) => {
			this.initChart();
		});
	}

	ngOnInit() {
		this.initChart();
		this.productService.getProductsSmall().then((data) => (this.products = data));
		this.items = [
			{ label: 'Add New', icon: 'pi pi-fw pi-plus' },
			{ label: 'Remove', icon: 'pi pi-fw pi-minus' }
		];

		this.maps = [
			{ name: 'Line Chart', code: 'line' },
			{ name: 'Bar', code: 'bar' },
			{ name: 'Pie', code: 'pie' }
		];

		this.selectedMap = this.maps[0];
		if (this.router.url == '/dashboard') {
			this.layoutService.isDisplayDashboard = false;
		} else {
			this.layoutService.isDisplayDashboard = true;
		}
		this.layoutService.gridHeader.subscribe((data) => {
			// if(data.subStrHeader == 'Dashboard View' || data.subStrHeader == 'Configuration & Setup' || data.subStrHeader == 'Table Maintenance'
			// || data.subStrHeader == 'SMC' || data.subStrHeader == 'Systems') {
			if (data.subStrHeader == 'Dashboard View') {
				this.layoutService.isSelection = false;
			} else {
				this.layoutService.isSelection = true;
			}

			if (data.subStrHeader == 'Configuration & Setup' || data.subStrHeader == 'Table Maintenance' || data.subStrHeader == 'SMC' || data.subStrHeader == 'Systems') {
				this.router.navigate(['/uikit/blank']);
			}
		});
	}

	initChart() {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');
		const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
		const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

		this.chartData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'First Dataset',
					data: [65, 59, 80, 81, 56, 55, 40],
					fill: false,
					backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
					borderColor: documentStyle.getPropertyValue('--bluegray-700'),
					tension: 0.4
				},
				{
					label: 'Second Dataset',
					data: [28, 48, 40, 19, 86, 27, 90],
					fill: false,
					backgroundColor: documentStyle.getPropertyValue('--green-600'),
					borderColor: documentStyle.getPropertyValue('--green-600'),
					tension: 0.4
				}
			]
		};

		this.pieData = {
			labels: ['A', 'B', 'C'],
			datasets: [
				{
					data: [540, 325, 702],
					backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500')],
					hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400')]
				}
			]
		};

		this.pieOptions = {
			plugins: {
				legend: {
					labels: {
						usePointStyle: true,
						color: textColor
					}
				}
			}
		};

		this.barData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'My First dataset',
					backgroundColor: documentStyle.getPropertyValue('--primary-500'),
					borderColor: documentStyle.getPropertyValue('--primary-500'),
					data: [65, 59, 80, 81, 56, 55, 40]
				},
				{
					label: 'My Second dataset',
					backgroundColor: documentStyle.getPropertyValue('--primary-200'),
					borderColor: documentStyle.getPropertyValue('--primary-200'),
					data: [28, 48, 40, 19, 86, 27, 90]
				}
			]
		};

		this.barOptions = {
			plugins: {
				legend: {
					labels: {
						fontColor: textColor
					}
				}
			},
			scales: {
				x: {
					ticks: {
						color: textColorSecondary,
						font: {
							weight: 500
						}
					},
					grid: {
						display: false,
						drawBorder: false
					}
				},
				y: {
					ticks: {
						color: textColorSecondary
					},
					grid: {
						color: surfaceBorder,
						drawBorder: false
					}
				}
			}
		};

		this.chartOptions = {
			plugins: {
				legend: {
					labels: {
						color: textColor
					}
				}
			},
			scales: {
				x: {
					ticks: {
						color: textColorSecondary
					},
					grid: {
						color: surfaceBorder,
						drawBorder: false
					}
				},
				y: {
					ticks: {
						color: textColorSecondary
					},
					grid: {
						color: surfaceBorder,
						drawBorder: false
					}
				}
			}
		};
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
