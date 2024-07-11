import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './modules/layout/components/layout/app.layout.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
	imports: [
		RouterModule.forRoot(
			[
				{
					path: '',
					component: AppLayoutComponent,
					children: [
						{ path: '', loadChildren: () => import('./auth/login/login.module').then((m) => m.LoginModule) },
						{ path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule), canActivate: [AuthGuard] },
						{ path: 'uikit', loadChildren: () => import('./modules/configuration&setup/configuration&setup.module').then((m) => m.UIkitModule), canActivate: [AuthGuard] }
					]
				},
				{ path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
				{ path: '**', redirectTo: '/notfound' }
			],
			{ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }
		)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
