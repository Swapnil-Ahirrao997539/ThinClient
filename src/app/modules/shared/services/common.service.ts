import { Injectable } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import * as xml2js from 'xml2js';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	public langVar = new Subject<any>();
	public formObject = new Subject<any>();
	public returnValidation = new Subject<any>();

	langVar$ = this.langVar.asObservable();

	formObject$ = this.formObject.asObservable();

	returnValidation$ = this.returnValidation.asObservable();

	constructor() {}

	// Method to set a new loader class dynamically
	setTranslateLoader(loaderClass: any) {
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: loaderClass
			}
		});
	}

	formDataCapture(data: any) {}

	/**
	 * Methode to convert received xml String into JSON object format
	 */
	xmlToJson(xmlString: string): Promise<any> {
		const parser = new xml2js.Parser({ explicitArray: false });
		return new Promise((resolve, reject) => {
			parser.parseString(xmlString, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
				console.log(result);
			});
		});
	}
}
