import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PayplusTranslateLoaderService implements TranslateLoader {
	getTranslation(lang: string): Observable<any> {
		let dt1 = of({
			label_Sign_in_to_continue: 'Sign in to continue',
			label_last_login_date_and_time: 'Last Login Date and Time:',
			label_session_type: 'Session Type:',
			label_current_selections: 'Current Selections :',
			label_view_type: 'View Type :'
		});
		let dt2 = of({
			label_Sign_in_to_continue: 'Connectez-vous pour continuer',
			label_last_login_date_and_time: 'Date et heure de la dernière connexion :',
			label_session_type: 'Type de séance :',
			label_current_selections: 'Sélections actuelles :',
			label_view_type: 'Type de vue :'
		});

		return lang == 'en' ? dt1 : dt2;
	}

	constructor() {}
}
