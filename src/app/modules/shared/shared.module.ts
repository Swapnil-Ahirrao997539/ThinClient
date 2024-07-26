import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayplusGridComponent } from './components/payplus-grid/payplus-grid.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ChipsComponent } from './components/chips/chips.component';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RestApiService } from './services/rest-api.service';
import { PayplusTranslateLoaderService } from './services/payplus-translate-loader.service';
import { LayoutService } from '../layout/services/app.layout.service';
import { CommonService } from './services/common.service';
import { PayplusMissingTranslationHandlerService } from './services/payplus-missing-translation-handler.service';
import { PayplusTranslateFrLoaderService } from './services/payplus-translate-fr-loader.service';
import { SubheaderToolbarComponent } from './components/subheader-toolbar/subheader-toolbar.component';
@NgModule({
	declarations: [PayplusGridComponent, ChipsComponent, SubheaderToolbarComponent],
	imports: [
		CommonModule,
		TableModule,
		FileUploadModule,
		FormsModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		RatingModule,
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
		ChipModule,
		MultiSelectModule,
		ToolbarModule,
		TranslateModule.forRoot({
			loader: { provide: TranslateLoader, useClass: false ? PayplusTranslateFrLoaderService : PayplusTranslateLoaderService },
			missingTranslationHandler: {
				provide: MissingTranslationHandler,
				useClass: PayplusMissingTranslationHandlerService
			}
		})
	],
	exports: [PayplusGridComponent, ChipsComponent, TranslateModule, SubheaderToolbarComponent]
})
export class SharedModule {
	[x: string]: any;
	static forRoot(): ModuleWithProviders<unknown> {
		return {
			ngModule: SharedModule,
			providers: [MessageService, RestApiService, TranslateService, CommonService]
		};
	}

	constructor(translate: TranslateService, commonService: CommonService) {
		translate.setDefaultLang('en');
		translate.use('en');
		commonService.langVar.subscribe((data) => {
			translate.setDefaultLang(data);
			translate.use(data);
		});
	}
}
