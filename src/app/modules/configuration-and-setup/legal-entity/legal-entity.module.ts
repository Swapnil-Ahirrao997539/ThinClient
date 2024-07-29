import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalEntityRoutingModule } from './legal-entity-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LegalEntityComponent } from './components/legal-entity/legal-entity.component';
import { SharedModule } from '../../shared/shared.module';
import { LegalEntityMainComponent } from './components/legal-entity-main/legal-entity-main.component';
import { MessagesModule } from 'primeng/messages';

@NgModule({
	imports: [
		CommonModule,
		LegalEntityRoutingModule,
		FormsModule,
		ToolbarModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		AccordionModule,
		TabViewModule,
		FieldsetModule,
		MenuModule,
		InputTextModule,
		DividerModule,
		SplitterModule,
		PanelModule,
		TableModule,
		AutoCompleteModule,
		ReactiveFormsModule,
		DropdownModule,
		BreadcrumbModule,
		SharedModule.forRoot(),
		MessagesModule,
		MessagesModule
	],
	declarations: [LegalEntityComponent, LegalEntityMainComponent]
})
export class LegalEntityModule {}
