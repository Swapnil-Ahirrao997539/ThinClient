import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationListComponent } from './location-list/location-list.component';
import { LegalEntityComponent } from './legal-entity-grid/legal-entity.component';

const routes: Routes = [];

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: 'location-list', data: { breadcrumb: 'Location List' }, component: LocationListComponent },
			{ path: 'legal-entity-list', data: { breadcrumb: 'Legal Entity List' }, component: LegalEntityComponent }
		])
	],
	exports: [RouterModule]
})
export class GridListRoutingModule {}
