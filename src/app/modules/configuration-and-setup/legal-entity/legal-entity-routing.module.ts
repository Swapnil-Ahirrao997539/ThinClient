import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalEntityMainComponent } from './components/legal-entity-main/legal-entity-main.component';
import { ErrorComponent } from '../../shared/components/error-tab/error.component';
import { LegalEntityComponent } from './components/legal-entity/legal-entity.component';

const routes: Routes = [];

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: LegalEntityComponent,
				children: [
					{
						path: 'legal-entity-main',
						component: LegalEntityMainComponent
					},
					{
						path: 'error',
						component: ErrorComponent
					}
				]
			}
		])
	],
	exports: [RouterModule]
})
export class LegalEntityRoutingModule {}
