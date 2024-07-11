import { Component, Input, input } from '@angular/core';
import { LayoutService } from 'src/app/modules/layout/services/app.layout.service';

@Component({
	selector: 'app-chips',
	// standalone: true,
	// imports: [],
	templateUrl: './chips.component.html',
	styleUrl: './chips.component.scss'
})
export class ChipsComponent {
	labelData = [];
	gridHeader: any;
	@Input() data: any;
	dt: any = [];
	constructor(private layoutService: LayoutService) {}
	ngOnInit() {
		let r = this.data;
		this.layoutService.gridHeader.subscribe((data) => {
			this.gridHeader = data.subStrHeader;
			this.dt.push(this.gridHeader);
		});
		this.labelData.push(this.data);
	}
	onChipClick(data: any) {}

	popChip() {
		this.dt.pop();
	}
}
