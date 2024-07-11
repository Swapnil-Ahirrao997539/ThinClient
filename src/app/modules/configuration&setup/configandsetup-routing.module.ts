import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlankScreenComponent } from '../shared/components/blank-screen/blank-screen.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: 'legal-entity', data: { breadcrumb: ['Menu', 'Legal Entity'] }, loadChildren: () => import('./legal-entity/legal-entity.module').then((m) => m.LegalEntityModule) },
			{ path: 'location', data: { breadcrumb: ['Menu', 'Location'] }, loadChildren: () => import('./location/location.module').then((m) => m.LocationModule) },
			{ path: 'grid-list', data: { breadcrumb: 'Grid List' }, loadChildren: () => import('./grid-list/grid-list.module').then((m) => m.GridListModule) },
			{ path: 'blank', data: { breadcrumb: 'Grid List' }, component: BlankScreenComponent },

			{ path: '**', redirectTo: '/notfound' }
		])
	],
	exports: [RouterModule]
})
export class UIkitRoutingModule {}
