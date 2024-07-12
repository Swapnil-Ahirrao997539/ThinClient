import { Injectable, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RestApiService } from '../../shared/services/rest-api.service';

export interface AppConfig {
	inputStyle: string;
	colorScheme: string;
	theme: string;
	ripple: boolean;
	menuMode: string;
	scale: number;
	fontSize: string;
}

interface LayoutState {
	staticMenuDesktopInactive: boolean;
	overlayMenuActive: boolean;
	profileSidebarVisible: boolean;
	configSidebarVisible: boolean;
	staticMenuMobileActive: boolean;
	menuHoverActive: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class LayoutService {
	isDisplay: boolean = false;
	isDisplayDashboard: boolean = true;
	isSelection: boolean = true;
	dt: any = [];

	_config: AppConfig = {
		ripple: false,
		inputStyle: 'outlined',
		menuMode: 'static',
		colorScheme: 'light',
		theme: 'thin-client-pro',
		scale: 14,
		fontSize: '14px'
	};

	config = signal<AppConfig>(this._config);

	state: LayoutState = {
		staticMenuDesktopInactive: false,
		overlayMenuActive: false,
		profileSidebarVisible: false,
		configSidebarVisible: false,
		staticMenuMobileActive: false,
		menuHoverActive: false
	};

	private configUpdate = new Subject<AppConfig>();

	private overlayOpen = new Subject<any>();
	public accordianOpen = new Subject<any>();
	public queueExplorerString = new Subject<any>();
	public gridHeader = new Subject<any>();
	public fontSize = new Subject<any>();
	public langVar = new Subject<any>();
	public drilldownData = new Subject<any>();

	// public items = new Subject<any[]>();
	items: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

	configUpdate$ = this.configUpdate.asObservable();

	overlayOpen$ = this.overlayOpen.asObservable();

	accordianOpen$ = this.accordianOpen.asObservable();

	queueExplorerString$ = this.queueExplorerString.asObservable();

	gridHeader$ = this.gridHeader.asObservable();

	items$ = this.items.asObservable();

	fontSize$ = this.fontSize.asObservable();

	constructor(
		public router: Router,
		private restApiService: RestApiService
	) {
		if (this.router.url == '/') {
			this.isDisplay = false;
		} else {
			this.isDisplay = true;
		}

		if (this.router.url == '/dashboard') {
			this.isSelection = false;
		} else {
			this.isSelection = true;
		}

		effect(() => {
			const config = this.config();
			if (this.updateStyle(config)) {
				this.changeTheme();
			}
			this.changeScale(config.scale);
			this.changeFont(config.fontSize);
			this.onConfigUpdate();
		});
	}

	/** GetUSeConData Capture to procress tree draw */
	GetUseConRep(url?: any): Observable<any> {
		return this.restApiService.get(url);
	}

	updateStyle(config: AppConfig) {
		return config.theme !== this._config.theme || config.colorScheme !== this._config.colorScheme;
	}

	onMenuToggle() {
		if (this.isOverlay()) {
			this.state.overlayMenuActive = !this.state.overlayMenuActive;
			if (this.state.overlayMenuActive) {
				this.overlayOpen.next(null);
			}
		}

		if (this.isDesktop()) {
			this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
		} else {
			this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

			if (this.state.staticMenuMobileActive) {
				this.overlayOpen.next(null);
			}
		}
	}

	showProfileSidebar() {
		this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
		if (this.state.profileSidebarVisible) {
			this.overlayOpen.next(null);
		}
	}

	showConfigSidebar() {
		this.state.configSidebarVisible = true;
	}

	isOverlay() {
		return this.config().menuMode === 'overlay';
	}

	isDesktop() {
		return window.innerWidth > 991;
	}

	isMobile() {
		return !this.isDesktop();
	}

	onConfigUpdate() {
		this._config = { ...this.config() };
		this.configUpdate.next(this.config());
	}

	changeTheme() {
		const config = this.config();
		const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
		const themeLinkHref = themeLink.getAttribute('href')!;
		const newHref = themeLinkHref
			.split('/')
			.map((el) => (el == this._config.theme ? (el = config.theme) : el == `theme-${this._config.colorScheme}` ? (el = `theme-${config.colorScheme}`) : el))
			.join('/');

		this.replaceThemeLink(newHref);
	}

	replaceThemeLink(href: string) {
		const id = 'theme-css';
		let themeLink = <HTMLLinkElement>document.getElementById(id);
		const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

		cloneLinkElement.setAttribute('href', href);
		cloneLinkElement.setAttribute('id', id + '-clone');

		themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);
		cloneLinkElement.addEventListener('load', () => {
			themeLink.remove();
			cloneLinkElement.setAttribute('id', id);
		});
	}

	changeScale(value: number) {
		document.documentElement.style.fontSize = `${value}px`;
	}

	changeFont(value: string) {
		document.documentElement.style.fontSize = value;
	}
}
