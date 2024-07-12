import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutModule } from 'src/app/modules/layout/app.layout.module';
import { UIkitRoutingModule } from './configandsetup-routing.module';

@NgModule({
	imports: [CommonModule, UIkitRoutingModule]
})
export class UIkitModule {}
