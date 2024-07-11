import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalEntityComponent } from './components/legal-entity-form/legal-entity.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([{ path: '', component: LegalEntityComponent }])],
	exports: [RouterModule]
})
export class LegalEntityRoutingModule {}
