import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from './app.settings';
import { Observable, catchError, map, throwError } from 'rxjs';
import { T } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class RestApiService {
	constructor(
		private http: HttpClient,
		private router: Router,
		private messageService: MessageService
	) {}
	/**
	 * Title : prepenApiUrl()
	 * Purpose : Prepare server call request url according to param/without param
	 */
	private prependApiUrl(param): any {
		if (param) {
			return AppSettings.BASE_URL + '?' + param;
		} else {
			return AppSettings.BASE_URL;
		}
	}

	post(body: any, additionalParameter?: string): Observable<{}> {
		let url = this.prependApiUrl(additionalParameter);
		return this.http.post(url, body, { headers: this.getHeader(), responseType: 'text', observe: 'response' }).pipe(catchError((error): any => this.handleError(error)));
	}

	get(url?:any): Observable<{}> {
		// let url = this.prependApiUrl(additionalParameter);
		return this.http.get(url, { headers: this.getHeader(), responseType: 'text', observe: 'response' }).pipe(catchError((error): any => this.handleError(error)));
	}

	private getHeader() {
		let headers = new HttpHeaders();
		return headers;
	}

	/** Handle Error status code with respective actions  */
	private handleError(error: HttpErrorResponse | any) {
		if (error.status === 400) {
			return throwError(error.error);
		} else if (error.status === 500 || error.status === 403) {
			return throwError(error.error);
		} else if (error.status === 401) {
			return this.router.navigate(['/']);
		} else if (error.status == 502) {
			return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server is not available for this moment.Please try again.' });
		}
	}
}
