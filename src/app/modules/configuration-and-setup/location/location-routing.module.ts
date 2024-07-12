import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: LocationComponent }
	])],   exports: [RouterModule]
})
export class LocationRoutingModule { }
