import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AppSettings {
	buTrees: any = [
		{ name: 'Atlanta-2', code: 'Atlanta-2' },
		{ name: 'New Branch SC', code: 'New Branch SC' },
		{ name: 'SEB TP', code: 'SEB TP' },
		{ name: 'London Branch', code: 'London Branch' },
		{ name: 'System', code: 'System' },
		{ name: 'Treasury Security', code: 'Treasury Security' },
		{ name: 'Bahamas Beach Banck', code: 'Bahamas Beach Banck' }
	];

	public static BASE_URL = 'http://localhost:8080/thinClient/servlet/MainServlet';
	public static Base_Image_URL = 'assets/layout/images/tree/';
}
