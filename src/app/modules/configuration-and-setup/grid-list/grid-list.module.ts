import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridListRoutingModule } from './grid-list-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LocationListComponent } from './location-list/location-list.component';
import { ChipModule } from 'primeng/chip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LegalEntityComponent } from './legal-entity-grid/legal-entity.component';

@NgModule({
	declarations: [LocationListComponent, LegalEntityComponent],
	imports: [CommonModule, GridListRoutingModule, SharedModule, BreadcrumbModule]
})
export class GridListModule {}
