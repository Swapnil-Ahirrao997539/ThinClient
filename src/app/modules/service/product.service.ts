import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { LegalEntity } from '../api/legal-entiry-model';

@Injectable()
export class ProductService {
	constructor(private http: HttpClient) {}

	getProductsSmall() {
		return this.http
			.get<any>('assets/demo/data/products-small.json')
			.toPromise()
			.then((res) => res.data as Product[])
			.then((data) => data);
	}

	getProducts() {
		return this.http
			.get<any>('assets/demo/data/products.json')
			.toPromise()
			.then((res) => res.data as Product[])
			.then((data) => data);
	}
	getData(url) {
		return this.http
			.get<any>(url)
			.toPromise()
			.then((res) => res.data as LegalEntity[])
			.then((data) => data);
	}

	getProductsMixed() {
		return this.http
			.get<any>('assets/demo/data/products-mixed.json')
			.toPromise()
			.then((res) => res.data as Product[])
			.then((data) => data);
	}

	getProductsWithOrdersSmall() {
		return this.http
			.get<any>('assets/demo/data/products-orders-small.json')
			.toPromise()
			.then((res) => res.data as Product[])
			.then((data) => data);
	}
}
