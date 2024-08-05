import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise, Subscription, take } from 'rxjs';
import { LayoutService } from '../../services/app.layout.service';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../../shared/services/common.service';
import { AppTopBarComponent } from '../topbar/app.topbar.component';
import { AppSidebarComponent } from '../sidebar/app.sidebar.component';

@Component({
	selector: 'app-layout',
	templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnInit, OnDestroy {
	overlayMenuOpenSubscription: Subscription;
	dt: any = [];
	menuOutsideClickListener: any;
	profileMenuOutsideClickListener: any;
	selectedChip: any;
	previousUrl: string;
	selectedTab: any;
	@ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

	@ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

	constructor(
		public layoutService: LayoutService,
		private _http: HttpClient,
		public renderer: Renderer2,
		public router: Router,
		public location: Location,
		private messageService: MessageService,
		private commonService: CommonService
	) {
		if (this.router.url == '/') {
			this.layoutService.isDisplay = false;
		} else {
			this.layoutService.isDisplay = true;
		}
		this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
			if (!this.menuOutsideClickListener) {
				this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
					const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target) || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));

					if (isOutsideClicked) {
						this.hideMenu();
					}
				});
			}

			if (!this.profileMenuOutsideClickListener) {
				this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
					const isOutsideClicked = !(
						this.appTopbar.menu.nativeElement.isSameNode(event.target) ||
						this.appTopbar.menu.nativeElement.contains(event.target) ||
						this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) ||
						this.appTopbar.topbarMenuButton.nativeElement.contains(event.target)
					);

					if (isOutsideClicked) {
						this.hideProfileMenu();
					}
				});
			}

			if (this.layoutService.state.staticMenuMobileActive) {
				this.blockBodyScroll();
			}
		});

		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			this.hideMenu();
			this.hideProfileMenu();
		});

		this.startSaveHistory();
		this.loadParentXML();
	}
	gridHeader: any;
	private history: any[] = [];
	sysFlag = 0;
	ngOnInit(): void {
		this.layoutService.gridHeader.subscribe((data) => {
			this.gridHeader = data.subStrHeader;
			if (this.gridHeader == 'Dashboard View') {
				this.dt = [];
			}

			if (data == 'Dashboard View') {
				this.dt = [];
				this.router.navigate(['/configuration-and-setup/blank']);
			}

			this.overriteTabArray();
		});
	}
	/** Function for logic overrite tab array and Tab chips Logic*/
	overriteTabArray() {
		if (this.gridHeader) {
			let g = this.gridHeader.split('(');

			// Write logic for overite Tab array

			if (this.gridHeader.includes('(')) {
				// gridHeader contains bracket that means it comes from basket
				if (this.dt.includes(g[0] + 'Grid')) {
					return;
				} else {
					if (this.dt.length) {
						for (let k = 0; k < this.dt.length; k++) {
							if (this.dt[k].includes('Grid')) {
								this.dt[k] = g[0] + 'Grid';
								this.selectedChip = g[0] + 'Grid';

								return;
							}
						}
						// }
					}
					this.dt.push(g[0] + 'Grid');
					this.selectedChip = g[0] + 'Grid';
				}
			} else {
				if (this.dt.includes(g[0]) || g[0] == 'Configuration & Setup' || g[0] == 'Systems' || g[0] == 'SMC' || g[0] == 'Table Maintenance' || g[0] == 'Dashboard View' || g[0] == 'Create' || g[0] == 'Pending' || g[0] == 'Active' || g[0] == 'Rejected' || g[0] == 'Treasury Security') {
					// Make this Static strings with dynamic after json response received.
					return;
				}
				this.dt.push(g[0]);

				this.selectedChip = g[0];
			}
		}
	}

	/* Load Parent XML Data */

	loadParentXML() {
		let url = '/assets/demo/data/users.xml';
		this.layoutService.GetUseConRep(url).subscribe(
			(response: any) => {
				this.commonService.xmlToJson(response.body);
				// this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfull Response Received!!' });
			},
			(error) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servlet Exception! Please contact PAYplus for CLS Administrator.' });
			}
		);
	}

	startSaveHistory(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.history.push(event.urlAfterRedirects);
			}
		});
	}

	onChipClick(data: any, i) {}

	public getHistory(): string[] {
		return this.history;
	}

	getPreviosUrl(): any {
		if (this.history.length > 0) {
			return this.history[this.history.length - 2];
		}
	}

	popChip(item, i) {
		this.selectedChip;
		// if(this.dt.length > 0) {
		for (let i = 0; i < this.dt.length; i++) {
			if (this.dt[i] == this.selectedChip) {
				this.dt.splice(i, 1);
			}
		}

		this.selectedChip = this.dt[0];
		let hist: any[] = this.getHistory();
		if (this.dt.length > 0) {
			this.router.navigate([hist[0 + 2]]);
		} else {
			this.router.navigate(['/dashboard']);
			this.dt = [];
		}
		// if(this.dt.length == 0) {
		//     this.router.navigate(['/dashboard']);
		// } else {
		//     for(let i=0;i<this.history.length;i++) {
		//         if(this.history[i].includes('/grid-list')){

		//         }else {
		//              this.router.navigate([this.getPreviosUrl()]);
		//         }
		//     }

		// }
		//  console.log(this.getPreviosUrl());
	}

	chipClicked(e: any) {
		this.selectedChip = e;

		if (e.includes('Legal Entity')) {
			this.router.navigate(['/configuration-and-setup/legal-entity/legal-entity-main']);
		}
		if (e.includes('Location')) {
			this.router.navigate(['/configuration-and-setup/location']);
		}
		if (e.includes('Legal Entity Grid')) {
			this.router.navigate(['/configuration-and-setup/grid-list/legal-entity-list']);
		}
		if (e.includes('Location Grid')) {
			this.router.navigate(['/configuration-and-setup/grid-list/location-list']);
		}
	}

	hideMenu() {
		this.layoutService.state.overlayMenuActive = false;
		this.layoutService.state.staticMenuMobileActive = false;
		this.layoutService.state.menuHoverActive = false;
		if (this.menuOutsideClickListener) {
			this.menuOutsideClickListener();
			this.menuOutsideClickListener = null;
		}
		this.unblockBodyScroll();
	}

	hideProfileMenu() {
		this.layoutService.state.profileSidebarVisible = false;
		if (this.profileMenuOutsideClickListener) {
			this.profileMenuOutsideClickListener();
			this.profileMenuOutsideClickListener = null;
		}
	}

	blockBodyScroll(): void {
		if (document.body.classList) {
			document.body.classList.add('blocked-scroll');
		} else {
			document.body.className += ' blocked-scroll';
		}
	}

	unblockBodyScroll(): void {
		if (document.body.classList) {
			document.body.classList.remove('blocked-scroll');
		} else {
			document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	get containerClass() {
		return {
			'layout-theme-light': this.layoutService.config().colorScheme === 'light',
			'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
			'layout-overlay': this.layoutService.config().menuMode === 'overlay',
			'layout-static': this.layoutService.config().menuMode === 'static',
			'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
			'layout-overlay-active': this.layoutService.state.overlayMenuActive,
			'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
			'p-input-filled': this.layoutService.config().inputStyle === 'filled',
			'p-ripple-disabled': !this.layoutService.config().ripple
		};
	}

	ngOnDestroy() {
		if (this.overlayMenuOpenSubscription) {
			this.overlayMenuOpenSubscription.unsubscribe();
		}

		if (this.menuOutsideClickListener) {
			this.menuOutsideClickListener();
		}
	}
}
