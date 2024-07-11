import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MessageService, SortEvent } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ProductService } from 'src/app/modules/service/product.service';
import { LayoutService } from 'src/app/modules/layout/services/app.layout.service';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { Product } from '../../models/product';

interface Column {
	field: string;
	header: string;
}

interface expandedRows {
	[key: string]: boolean;
}

interface City {
	name: string;
	code: string;
}
@Component({
	selector: 'app-payplus-grid',
	// standalone: true,
	// imports: [],
	templateUrl: './payplus-grid.component.html',
	styleUrl: './payplus-grid.component.scss'
})
export class PayplusGridComponent implements OnChanges {
	productDialog: boolean = false;

	deleteProductDialog: boolean = false;

	deleteProductsDialog: boolean = false;

	products!: Product[];

	product: Product = {};

	selectedProducts: Product[] = [];

	submitted: boolean = false;

	cols!: Column[];

	ordercols!: Column[];

	statuses: any[] = [];

	rowsPerPageOptions = [5, 10, 20];

	selectedColumns!: Column[];

	metaKeySelection: boolean = false;

	cities: City[] | undefined;
	groupsList: any = [];
	selectefGroup: any;
	expandedRows: expandedRows = {};

	isExpanded: boolean = false;

	selectedCity: any = '1';

	currentPage: number = 1;
	pageSize: number = 10;
	first = 0;
	totalRecords: number; // Total number of records
	sortedData: any[]; // Sorted data array for the current page
	loading: boolean;
	currentPageData: any[];

	gridHeader: any;

	visible: boolean = false;

	visibleMsgEnq: boolean = false;

	constructor(
		private productService: ProductService,
		private messageService: MessageService,
		public router: Router,
		public layoutService: LayoutService,
		private MessageService: MessageService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.getData();

		this.cols = [
			{ field: 'code', header: 'Code' },
			{ field: 'name', header: 'Name' },
			{ field: 'price', header: 'Location' },
			{ field: 'category', header: 'Category' },
			{ field: 'rating', header: 'Date' }
			//   { field: 'inventoryStatus', header: 'Status' },
			//   { field: 'actions', header: 'Actions' }
		];

		this.ordercols = [
			{ field: 'id', header: 'Id' },
			{ field: 'customer', header: 'Customer' },
			{ field: 'date', header: 'Date' },
			{ field: 'amount', header: 'Amount' },
			// { field: 'quantity', header: 'Quantity' },
			{ field: 'status', header: 'Status' }
		];
		this.selectedColumns = this.cols;
		this.statuses = [
			{ label: 'INSTOCK', value: 'instock' },
			{ label: 'LOWSTOCK', value: 'lowstock' },
			{ label: 'OUTOFSTOCK', value: 'outofstock' }
		];

		this.cities = [
			{ name: '1', code: '1' },
			{ name: '2', code: '2' },
			{ name: '3', code: '3' }
		];
	}

	getData() {
		this.productService.getProducts().then((data) => {
			(this.products = data), this.cd.markForCheck();
			this.totalRecords = this.products.length;
		});
	}

	groupBy() {
		this.visible = true;
	}
	messageEnquiry() {
		this.visibleMsgEnq = true;
	}

	refresh() {
		this.getData();
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.selectedProducts;
	}

	openNew() {
		this.product = {};
		this.submitted = false;
		this.productDialog = true;
	}

	onSort(event: SortEvent) {
		// Your sorting logic
		this.updateSortedData();
	}

	updateSortedData() {
		// Calculate indices for the current page
		const startIndex = (this.currentPage - 1) * this.pageSize;
		const endIndex = Math.min(startIndex + this.pageSize, this.totalRecords);

		// Slice data for the current page
		const pageData = this.products.slice(startIndex, endIndex);

		// Apply sorting logic here if needed
		// For example, you can sort pageData using Array.prototype.sort() with event.field and event.order

		this.sortedData = pageData;
	}

	onRowClick(rowData) {
		// if(e.includes('Legal Entity')) {
		this.router.navigate(['/uikit/legal-entity']);
		// }
	}

	deleteSelectedProducts() {
		this.deleteProductsDialog = true;
	}

	editProduct(product: Product) {
		this.product = { ...product };
		this.productDialog = true;
	}

	deleteProduct(product: Product) {
		this.deleteProductDialog = true;
		this.product = { ...product };
	}

	expandAll() {
		if (!this.isExpanded) {
			this.products.forEach((product) => (product && product.name ? (this.expandedRows[product.name] = true) : ''));
		} else {
			this.expandedRows = {};
		}
		this.isExpanded = !this.isExpanded;
	}

	confirmDeleteSelected() {
		this.deleteProductsDialog = false;
		this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
		this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
		this.selectedProducts = [];
	}

	confirmDelete() {
		this.deleteProductDialog = false;
		this.products = this.products.filter((val) => val.id !== this.product.id);
		this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
		this.product = {};
	}

	hideDialog() {
		this.productDialog = false;
		this.submitted = false;
	}

	selectedItems(selected) {
		this.layoutService.drilldownData.next(selected);
		localStorage.setItem('drillData', JSON.stringify(selected));
		this.router.navigate(['/uikit/location']);
	}

	saveProduct() {
		this.submitted = true;

		if (this.product.name?.trim()) {
			if (this.product.id) {
				// @ts-ignore
				this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
				this.products[this.findIndexById(this.product.id)] = this.product;
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
			} else {
				this.product.id = this.createId();
				this.product.code = this.createId();
				this.product.image = 'product-placeholder.svg';
				// @ts-ignore
				this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
				this.products.push(this.product);
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
			}

			this.products = [...this.products];
			this.productDialog = false;
			this.product = {};
		}
	}

	findIndexById(id: string): number {
		let index = -1;
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].id === id) {
				index = i;
				break;
			}
		}

		return index;
	}

	createId(): string {
		let id = '';
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 5; i++) {
			id += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return id;
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}
}
