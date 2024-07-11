import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductService } from './modules/service/product.service';
import { CountryService } from './modules/service/country.service';
import { CustomerService } from './modules/service/customer.service';
import { EventService } from './modules/service/event.service';
import { IconService } from './modules/service/icon.service';
import { NodeService } from './modules/service/node.service';
import { PhotoService } from './modules/service/photo.service';
import { SharedModule } from './modules/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { AppLayoutModule } from './modules/layout/app.layout.module';

@NgModule({
	declarations: [AppComponent],
	imports: [AppRoutingModule, AppLayoutModule, SharedModule.forRoot(), ToastModule],
	providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, CountryService, CustomerService, EventService, IconService, NodeService, PhotoService, ProductService],
	bootstrap: [AppComponent]
})
export class AppModule {}
