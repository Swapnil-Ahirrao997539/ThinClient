import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEvent } from '../models/menuchangeevent';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	private menuSource = new Subject<MenuChangeEvent>();
	private resetSource = new Subject();

	public sessionType = new Subject<any>(); // session type
	public moduleValue = new Subject<any>(); // Current Selection
	public selectedViewType = new Subject<any>(); // View Type

	menuSource$ = this.menuSource.asObservable();
	resetSource$ = this.resetSource.asObservable();
	selectedViewType$ = this.selectedViewType.asObservable();
	sessionType$ = this.sessionType.asObservable();
	moduleValue$ = this.moduleValue.asObservable();

	onMenuStateChange(event: MenuChangeEvent) {
		this.menuSource.next(event);
	}

	reset() {
		this.resetSource.next(true);
	}
}
