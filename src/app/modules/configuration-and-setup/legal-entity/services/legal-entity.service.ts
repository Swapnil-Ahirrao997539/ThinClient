import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from 'src/app/modules/shared/services/rest-api.service';

@Injectable({
	providedIn: 'root'
})
export class LegalEntityService {
	constructor(private restApiService: RestApiService) {}

	/** getTabData Capture to procress tab draw */
	getTabData(url?: any): Observable<any> {
		return this.restApiService.get(url);
	}
}
