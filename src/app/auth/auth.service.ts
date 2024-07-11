import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RestApiService } from '../modules/shared/services/rest-api.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	users: any[] = [
		{
			id: 1,
			name: 'Swapnil',
			username: 'IRIS01',
			password: ''
		},
		{
			id: 1,
			name: 'Umesh',
			username: 'umesh',
			password: 'xyz'
		}
	];
	session: any;
	constructor(
		private router: Router,
		private restApiService: RestApiService
	) {
		let session: any = localStorage.getItem('session');
		if (session) {
			session = JSON.parse(session);
		}

		this.session = session;
	}

	login(username: string, password: string) {
		let user = this.users.find((u) => u.username === username && u.password === password);

		if (user) {
			this.session = user;
			localStorage.setItem('session', JSON.stringify(this.session));
			localStorage.setItem('username', username);
		}

		return user;
	}

	obfuscate(s: string) {
		if (s == null || s == undefined) return null;

		var buf = new Array();
		var b = new Array();
		for (var j = 0; j < s.length; j++) b[j] = s.charCodeAt(j);
		for (var i = 0; i < b.length; i++) {
			var b1 = b[i];
			var b2 = b[s.length - (i + 1)];
			var i1 = parseInt(b1) + parseInt(b2) + 127;
			var i2 = parseInt(b1) - parseInt(b2) + 127;
			var i0 = i1 * 256 + i2;

			var x = i0.toString(36); // use built-in function
			switch (x.length) {
				case 1:
					buf.push('0');
					break;
				case 2:
					buf.push('0');
					break;
				case 3:
					buf.push('0');
					break;
				default:
					buf.push(x);
			}
		}

		return buf.join('');
	}
	/*** Get version details call */
	getVersionDetails(data?: any, param?: any): Observable<any> {
		return this.restApiService.post(data, param);
	}

	signin(data?: any): Observable<any> {
		return this.restApiService.post(data);
	}

	login302call(data?: any, param?: any): Observable<any> {
		return this.restApiService.post(data, param);
	}

	/*** Logout with session flushed functionality */
	logout() {
		this.router.navigateByUrl('/');
		window.location.reload();
		this.session = undefined;
		localStorage.removeItem('session');
	}
}
