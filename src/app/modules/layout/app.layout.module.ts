import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AppConfigModule } from './config/config.module';
import { AppLayoutComponent } from './components/layout/app.layout.component';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { TreeModule } from 'primeng/tree';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChipModule } from 'primeng/chip';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LayoutService } from './services/app.layout.service';
import { PayplusMissingTranslationHandlerService } from '../shared/services/payplus-missing-translation-handler.service';
import { PayplusTranslateFrLoaderService } from '../shared/services/payplus-translate-fr-loader.service';
import { PayplusTranslateLoaderService } from '../shared/services/payplus-translate-loader.service';
import { AppTopBarComponent } from './components/topbar/app.topbar.component';
import { AppFooterComponent } from './components/footer/app.footer.component';
import { AppMenuComponent } from './components/menu/app.menu.component';
import { AppMenuitemComponent } from './components/menu/app.menuitem.component';
import { AppSidebarComponent } from './components/sidebar/app.sidebar.component';

@NgModule({
	declarations: [AppMenuitemComponent, AppTopBarComponent, AppFooterComponent, AppMenuComponent, AppSidebarComponent, AppLayoutComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		InputTextModule,
		SidebarModule,
		BadgeModule,
		RadioButtonModule,
		InputSwitchModule,
		RippleModule,
		RouterModule,
		AppConfigModule,
		PanelModule,
		AccordionModule,
		TreeModule,
		DropdownModule,
		SelectButtonModule,
		ChipModule,
		SharedModule.forRoot(),

		ButtonModule,
		AvatarGroupModule,
		AvatarModule,
		DialogModule,
		AutoCompleteModule
	],
	exports: [AppLayoutComponent]
})
export class AppLayoutModule {}
