import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PayplusTranslateFrLoaderService implements TranslateLoader {
	getTranslation(lang: string): Observable<any> {
		return of({
			label_Sign_in_to_continue: 'Connectez-vous pour continuer',
			label_last_login_date_and_time: 'Date et heure de la dernière connexion :'
		});
	}

	constructor() {}
}
