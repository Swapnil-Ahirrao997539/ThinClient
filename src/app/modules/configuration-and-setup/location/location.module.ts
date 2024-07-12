import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
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
import { LocationComponent } from './location.component';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [LocationComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
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
		BreadcrumbModule 

  ]
})
export class LocationModule { }
