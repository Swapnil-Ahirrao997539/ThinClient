import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/modules/shared/services/app.settings';
import { MenuService } from '../../services/app.menu.service';
import { NodeService } from 'src/app/modules/service/node.service';
import { LayoutService } from '../../services/app.layout.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { BuTree } from '../../models/butree';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-menu',
	templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
	isCollapse: boolean;
	model: any[] = [];
	activeIndex: number | undefined = 0;
	files1: TreeNode[] = [];
	selectedFiles1: TreeNode[] = [];
	items: any[] | undefined;

	//Global Variables
	buId: any;
	buName: any;
	custIn: any;
	scIn: any;
	buTp: any;
	treeExploreeBackup: any;

	selectedItem: any;
	changeFont: boolean = false;
	suggestions: any[] | undefined;
	files!: TreeNode[];
	treeObject: BuTree[];
	currentSelection: any;
	viewType: any;
	sessionType: any;
	version: any;
	matchString: any;
	stateOptions: any[] = [
		{ label: 'Processing', value: 'Processing' },
		{ label: 'User Admin', value: 'User Admin' }
	];

	value: string = 'Processing';

	activeIndx: number = 0;
	index: number = 0;
	queueName: any;
	constructor(
		public layoutService: LayoutService,
		private nodeService: NodeService,
		private menuService: MenuService,
		private APPCONSTANT: AppSettings,
		public router: Router,
		private authService: AuthService,
		private commonService: CommonService,
		private messageService: MessageService
	) {
		this.getVersionDetailCall();
	}

	ngOnInit() {
		if (this.router.url == '/dashboard') {
			this.layoutService.isSelection = false;
		} else {
			this.layoutService.isSelection = true;
		}

		this.nodeService.getFiles().then((data) => (this.files = data));
		this.loadParentXML();
		/**Catch default selections subject variable*/

		/** Bydefault (i.e."SMC") Menu and their child menu items without any check */

		this.model = [
			{
				label: 'Menu',
				isCollapse: true,
				items: [
					{
						label: 'SMC',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Session Control',
								icon: 'pi pi-fw pi-bookmark'
							},
							{
								label: 'Tuxedo Queue Monitor',
								icon: 'pi pi-fw pi-bookmark'
							}
						]
					},
					{
						label: 'Configuration & Setup',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Create',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/location'] },
									{ label: 'Legal Entity', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/legal-entity/legal-entity-main'] },
									{ label: 'Bank Relationship', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Fund Group', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool', icon: 'pi pi-fw pi-bookmark' }
								]
							}
						]
					},
					{
						label: 'Table Maintenance',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{ label: 'Bank Identifier', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Currency Holiday', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Payment Method cuttoff', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'External Interface', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Currency Maintenance', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Interdiction', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Exchange Rate ', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Processing ICA Rules', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Fund Manager', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Process Uploaded Funds', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Counterparty ALGD List', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Static Data Request', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Static Data Bulk Create', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'MI Auto Replay', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Static Data Bulk Amend', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Netting Groups', icon: 'pi pi-fw pi-bookmark' },
							{ label: 'Static Data Delete', icon: 'pi pi-fw pi-bookmark' }
						]
					}
					// {
					// 	label: 'Dashboard View',
					// 	icon: 'pi pi-fw pi-bookmark',
					// 	routerLink: ['/dashboard']
					// }
				]
			},
			{
				label: 'Tree',
				items: []
			},
			{
				label: 'Queue Explorer',
				items: [
					{
						label: 'Configuration & Setup',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Pending',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/grid-list/location-list'] },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/grid-list/legal-entity-list'] },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{
								label: 'Active',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{
								label: 'Rejected',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							}
						]
					}
				]
			}
		];

		this.layoutService.accordianOpen.subscribe((data) => {
			this.activeIndx = data;
		});

		this.menuService.moduleValue.subscribe((data) => {
			this.currentSelection = data;
			this.menuAppendOnSelection(data);
		});
		// this.menuService.selectedViewType.subscribe((data) => {
		// 	this.viewType = data;
		// });
		// this.menuService.sessionType.subscribe((data) => {
		// 	this.sessionType = data;
		// });
	}

	menuAppendOnSelection(selectedValue) {
		switch (selectedValue) {
			case 'User Admin':
				this.drawMenuItem(selectedValue);
				this.loadParentXML(selectedValue);
				break;
			case 'Processing':
				this.drawMenuItem(selectedValue);
				this.loadParentXML(selectedValue);

				break;
			case 'aggregate':
				this.drawMenuItem(selectedValue);
				break;
			case 'individual':
				this.drawMenuItem(selectedValue);
				break;
			case 'cls1':
				this.drawMenuItem(selectedValue);
				this.loadParentXML(selectedValue);

				break;
			case 'clsnet':
				this.drawMenuItem(selectedValue);
				this.loadParentXML(selectedValue);

				break;
			case 'lch':
				this.drawMenuItem(selectedValue);
				this.loadParentXML(selectedValue);

				break;
			case 'clsnow':
				this.drawMenuItem(selectedValue);
				this.loadParentXML(selectedValue);

				break;
		}
	}

	drawMenuItem(selectedValue) {
		if (selectedValue == 'cls1' || selectedValue == 'Processing' || selectedValue == 'aggregate' || selectedValue == 'individual') {
			// Flush the "Menu" and "Queue Explorer array and append with respective selections."
			this.model[2].items = [];
			this.model[0].items = [];

			this.layoutService.gridHeader.next('System');

			this.layoutService.isSelection = true;
			for (let i = 0; i < this.model.length; i++) {
				if (this.model[i].label == 'Queue Explorer') {
					this.model[i].items.push({
						label: 'Configuration & Setup',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Pending',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/grid-list/location-list'] },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/grid-list/legal-entity-list'] },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{
								label: 'Active',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							},
							{
								label: 'Rejected',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
								]
							}
						]
					});
				}

				/** Menu items appending on the basis of tree item selection */

				if (this.model[i].label == 'Menu') {
					this.model[i].items.push(
						{
							label: 'SMC',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Session Control',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'Tuxedo Queue Monitor',
									icon: 'pi pi-fw pi-bookmark'
								}
							]
						},
						{
							label: 'Configuration & Setup',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Create',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/location'] },
										{ label: 'Legal Entity', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/legal-entity'] },
										{ label: 'Bank Relationship', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Fund Group', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool', icon: 'pi pi-fw pi-bookmark' }
									]
								}
							]
						},
						{
							label: 'Table Maintenance',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{ label: 'Bank Identifier', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Currency Holiday', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Payment Method cuttoff', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'External Interface', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Currency Maintenance', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Interdiction', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Exchange Rate ', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Processing ICA Rules', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Fund Manager', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Process Uploaded Funds', icon: 'pi pi-fw pi-bookmark' },
								{
									label: 'Counterparty ALGD List',
									icon: 'pi pi-fw pi-bookmark'
								},
								{ label: 'Static Data Request', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Static Data Bulk Create', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'MI Auto Replay', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Static Data Bulk Amend', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Netting Groups', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Static Data Delete', icon: 'pi pi-fw pi-bookmark' }
							]
						}
						// {
						// 	label: 'Dashboard View',
						// 	icon: 'pi pi-fw pi-bookmark',
						// 	routerLink: ['/dashboard']
						// }
					);
					// this.layoutService.gridHeader.next('System');
				}
			}
		} else {
			this.model[2].items = [];
			this.model[0].items = [];

			this.layoutService.isSelection = true;

			for (let i = 0; i < this.model.length; i++) {
				if (this.model[i].label == 'Queue Explorer') {
					this.model[i].items.push({
						label: 'Configuration & Setup',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Pending',
								icon: 'pi pi-fw pi-bookmark',
								items: [{ label: 'Department (21)', icon: 'pi pi-fw pi-bookmark' }]
							},
							{
								label: 'Active',
								icon: 'pi pi-fw pi-bookmark',
								items: [{ label: 'Department (21)', icon: 'pi pi-fw pi-bookmark' }]
							},
							{
								label: 'Rejected',
								icon: 'pi pi-fw pi-bookmark',
								items: [{ label: 'Department (21)', icon: 'pi pi-fw pi-bookmark' }]
							}
						]
					});
				}

				if (this.model[i].label == 'Menu') {
					// this.model[i].items.push({
					// 	label: 'Dashboard View',
					// 	icon: 'pi pi-fw pi-bookmark',
					// 	routerLink: ['/dashboard']
					// });
					this.layoutService.gridHeader.next('Dashboard View');
				}
			}
		}
	}

	loadParentXML(selectedValue?) {
		let url;
		if (selectedValue && selectedValue == 'User Admin') {
			url = '/assets/demo/data/browserConRep.xml';
		} else {
			url = '/assets/demo/data/users.xml';
		}

		if (selectedValue && selectedValue == 'FLTBUS30X') {
			url = '/assets/demo/data/NetGroupingDetail.xml';
		}
		if (selectedValue && selectedValue == 'VENDGB32') {
			url = '/assets/demo/data/NetGroupingDetailVGB32.xml';
		}

		this.layoutService.GetUseConRep(url).subscribe(
			(response: any) => {
				const data = this.commonService.xmlToJson(response.body); // Capture JSON data of xml response
				/* Prepare Tree format object */
				data.then((res) => {
					if (res.PARAMETERS) {
						console.log('Browser Con' + res);
						const treeDataforUserAdmin: any = res.PARAMETERS.BrowserConRep.Organization.GroupOrganization;
						this.drawTreeforUserAdmin(treeDataforUserAdmin);
						//this.drawTree(treeDataforUserAdmin);
					} else {
						if (!res.NETTING_GROUP_DETAILS) {
							/** Prepare & Map tree object to SYSTEM -> Processing */
							if (res.USER_CONFIG.GetUseConRep.BuTree) {
								const treeData: any = res.USER_CONFIG.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode;
								this.drawTree(treeData);
								/** Capure global variables*/
								this.scIn = treeData[0].FIELD_NM[0].$.id;
								this.custIn = treeData[0].FIELD_NM[1].$.id;
								this.buTp = treeData[0].FIELD_NM[2].$.id;
								this.buId = treeData[0].FIELD_NM[3].$.id;
								this.buName = treeData[0].FIELD_NM[4].$.id;
							}
							if (selectedValue && (selectedValue == 'Processing' || selectedValue == 'ClS1' || selectedValue == 'clsnow')) {
								if (res.USER_CONFIG.GetUseConRep.BuTree) {
									const treeData: any = res.USER_CONFIG.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode;
									this.drawTree(treeData);
									/** Capure global variables*/
									this.scIn = treeData[0].FIELD_NM[0].$.id;
									this.custIn = treeData[0].FIELD_NM[1].$.id;
									this.buTp = treeData[0].FIELD_NM[2].$.id;
									this.buId = treeData[0].FIELD_NM[3].$.id;
									this.buName = treeData[0].FIELD_NM[4].$.id;
								}
							}
							/** Prepare & Map tree object to SYSTEM -> Processing -> Session Type -> CLSNET */
							if (selectedValue && selectedValue == 'clsnet') {
								if (res.USER_CONFIG.GetUseConRep.NettingGroupTree) {
									const treeData: any = res.USER_CONFIG.GetUseConRep.NettingGroupTree.GroupNettingGroupTree.NettingGroupList.GroupNettingGroupList;
									// this.treeExploreeBackup = treeData;
									this.drawTreeforCLSNET(treeData);
								}
							}

							/** Prepare & Map tree object to SYSTEM -> Processing -> Session Type -> LCH */
							if (selectedValue && selectedValue == 'lch') {
								// if (res.USER_CONFIG.GetUseConRep.NettingGroupTree) {
								const treeData: any = res.USER_CONFIG.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode;
								this.drawTreeforLCH(treeData);
								//}
							}
						} else {
							if (res.NETTING_GROUP_DETAILS) {
								this.drawTreeforCLSNETforNGDetails(res.NETTING_GROUP_DETAILS.DATA.DETAILS_DATA);
							}
						}
					}
				});
			},
			(error) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servlet Exception! Please contact PAYplus for CLS Administrator.' });
			}
		);
	}

	/***********************************************************************************************************/
	/* @function for draw tree with received object, make parent , child, subchild object to treeData for User Admin     ****/
	/***********************************************************************************************************/
	drawTreeforUserAdmin(treeData) {
		let parentChildren: any = [];
		let nodeChildren: any = [{ buNode: '', feild_name: '' }]; // For 1st level Node
		let childArray: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 2nd Level

		for (let i = 0; i < treeData.length; i++) {
			if (treeData[i].FIELD_NM[1]._ == 'ORGLEVEL001') {
				parentChildren.push(treeData[i].FIELD_NM[3]._);
			}
		}

		for (let k = 0; k < parentChildren.length; k++) {
			// 2nd Level
			childArray.push({
				key: '2-' + k,
				data: parentChildren[k],
				label: parentChildren[k],
				imagePath: AppSettings.Base_Image_URL + 'Department_CLOSED.gif',
				children: []
			});
		}
		childArray.splice(0, 1);

		/**Final Tree Draw */
		this.treeObject = [
			{
				key: '0',
				label: 'SYSTEM',
				data: 'Events Folder',
				// icon: 'pi pi-fw pi-calendar',
				// imagePath: 'assets/layout/images/tree/System_OPEN.gif',
				imagePath: this.getImage('SYSTEM', '', ''),

				children: []
			},
			{
				key: '1',
				label: 'TREASURY SECURITY',
				data: 'Events Folder',
				imagePath: this.getImage('TREASURY SECURITY', '', ''),

				children: childArray
			}
		];
	}
	/***********************************************************************************************************/
	/* @function for draw tree with received object, make parent , child, subchild object to treeData for CLSNET     ****/
	/***********************************************************************************************************/
	drawTreeforCLSNET(treeData) {
		let parentChildren: any = [];
		let nodeChildren: any = [{ buNode: '', feild_name: '' }]; // For 1st level Node
		let childArray: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 2nd Level
		let subChildArray: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 3rd Level

		for (let i = 0; i < treeData.length; i++) {
			parentChildren.push(treeData[i].FIELD_NM[1]._);
		}
		for (let k = 0; k < parentChildren.length; k++) {
			// 2nd Level
			childArray.push({
				key: '2-' + k,
				data: parentChildren[k],
				label: parentChildren[k],
				imagePath: AppSettings.Base_Image_URL + 'NettingGroup_CLOSED.gif',
				children: subChildArray
			});
		}
		childArray.splice(0, 1);

		/**Final Tree Draw */
		this.treeObject = [
			{
				key: '1',
				label: 'Tree Explorer',
				data: 'Events Folder',
				imagePath: this.getImage('SYSTEM', '', ''),

				children: childArray
			}
		];
	}
	/***********************************************************************************************************/
	/* @function for draw tree with received object, make parent , child, subchild object to treeData for CLSNET for Netting Group Details   ****/
	/***********************************************************************************************************/
	drawTreeforCLSNETforNGDetails(NGSubNM) {
		let parentChildren: any = [];
		let nodeChildren: any = [{ buNode: '', feild_name: '' }]; // For 1st level Node
		let childArray: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 2nd Level
		let subChildArray: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 3rd Level
		let t = this.treeObject;
		subChildArray.splice(0, 1);

		let tt = NGSubNM.NETTING_GROUP_ROW_DATA[0]['TMS_NG_BU_FUND_MAPPER.NETTING_GROUP_NM'];
		if (NGSubNM.NETTING_GROUP_ROW_DATA.length) {
			for (let i = 0; i < this.treeObject[0].children.length; i++) {
				for (let k = 0; k < NGSubNM.NETTING_GROUP_ROW_DATA.length; k++) {
					if (this.treeObject[0].children[i].label == NGSubNM.NETTING_GROUP_ROW_DATA[k]['TMS_NG_BU_FUND_MAPPER.NETTING_GROUP_NM']) {
						subChildArray.push({
							key: '2-' + i + '-' + k,
							data: NGSubNM.NETTING_GROUP_ROW_DATA[k]['TMS_NG_BU_FUND_MAPPER.NETTING_GROUP_NM'],
							label: NGSubNM.NETTING_GROUP_ROW_DATA[k]['TMS_NG_BU_FUND_MAPPER.NETTING_GROUP_NM'],
							imagePath: AppSettings.Base_Image_URL + 'Branch_CLOSED.gif',
							children: []
						});
					}
				}
				// this.treeObject[0].children[i].children.push(subChildArray);
			}
		} else {
		}
		for (let i = 0; i < this.treeObject[0].children.length; i++) {
			for (let l = 0; l < subChildArray.length; l++) {
				if (this.treeObject[0].children[i].label == subChildArray[l].label) {
					this.treeObject[0].children[i].children.push(subChildArray[l]);
				}
			}
		}

		this.treeObject[0];
		// for (let i = 0; i < treeData.length; i++) {
		// 	parentChildren.push(treeData[i].FIELD_NM[1]._);
		// }
		// debugger;
		// for (let k = 0; k < parentChildren.length; k++) {
		// 	// 2nd Level
		// 	childArray.push({
		// 		key: '2-' + k,
		// 		data: parentChildren[k],
		// 		label: parentChildren[k],
		// 		imagePath: AppSettings.Base_Image_URL + 'NettingGroup_CLOSED.gif',
		// 		children: subChildArray
		// 	});
		// }
		// childArray.splice(0, 1);

		/**Final Tree Draw */
		// this.treeObject = [
		// 	{
		// 		key: '1',
		// 		label: 'Tree Explorer',
		// 		data: 'Events Folder',
		// 		imagePath: this.getImage('SYSTEM', '', ''),

		// 		children: childArray
		// 	}
		// ];
	}

	/***********************************************************************************************************/
	/* @function for draw tree with received object, make parent , child, subchild object to treeData for LCH     ****/
	/***********************************************************************************************************/
	drawTreeforLCH(treeData) {
		// let parentChildren: any = [];
		// let nodeChildren: any = [{ buNode: '', feild_name: '' }]; // For 1st level Node
		// let childArray: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 2nd Level
		// debugger;
		// for (let i = 0; i < treeData.length; i++) {
		// 	parentChildren.push(treeData[i].FIELD_NM[1]._);
		// }
		// debugger;
		// for (let k = 0; k < parentChildren.length; k++) {
		// 	// 2nd Level
		// 	childArray.push({
		// 		key: '2-' + k,
		// 		data: parentChildren[k],
		// 		label: parentChildren[k],
		// 		imagePath: AppSettings.Base_Image_URL + 'NettingGroup_CLOSED.gif',
		// 		children: []
		// 	});
		// }
		// childArray.splice(0, 1);

		/**Final Tree Draw */
		this.treeObject = [
			{
				key: '2',
				label: treeData[1].FIELD_NM[9]._,
				data: 'Events Folder',
				imagePath: this.getImage(treeData[1].FIELD_NM[7]._, '', ''),
				children: []
			}
		];
	}

	/***********************************************************************************************************/
	/* @function for draw tree with received object, make parent , child, subchild object to treeData for Processing     ****/
	/***********************************************************************************************************/

	drawTree(treeData) {
		let parentChildren: any = [];
		let nodeChildren: any = [{ buNode: '', feild_name: '' }]; // For 1st level Node
		let subNodeChildren: any = [{ buNode: '', feild_name: '' }]; // For 1st level Node

		let childArray: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 2nd Level
		let subChildArray: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 3rd Level
		let subChildArrayFor4thLevel: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 4rd Level
		let subChildArrayFor5thLevel: any = [{ key: '', label: '', data: '', icon: '', imagePath: '', children: [] }]; // For 5th Level
		for (let i = 0; i < treeData[1].BuNode.GroupBuNode.length; i++) {
			// 1st Level
			parentChildren.push(treeData[1].BuNode.GroupBuNode[i].FIELD_NM[9]._);
			if (treeData[1].BuNode.GroupBuNode[i].BuNode) {
				nodeChildren.push({
					buNode: treeData[1].BuNode.GroupBuNode[i].BuNode,
					feild_name: treeData[1].BuNode.GroupBuNode[i].FIELD_NM
				});
			} else {
				nodeChildren.push({
					buNode: '',
					feild_name: treeData[1].BuNode.GroupBuNode[i].FIELD_NM
				});
			}
		}
		nodeChildren.splice(0, 1);
		childArray.splice(0, 1);
		subChildArray.splice(0, 1);
		subChildArrayFor4thLevel.splice(0, 1);
		subChildArrayFor5thLevel.splice(0, 1);

		// Prepare Childrens object for Tree
		for (let k = 0; k < parentChildren.length; k++) {
			// 2nd Level
			childArray.push({
				key: '2-' + k,
				data: parentChildren[k],
				label: parentChildren[k],
				imagePath: '',
				children: subChildArray
			});

			// Prepare sub-children object with respective BuTree
			for (let j = 0; j < nodeChildren.length; j++) {
				if (parentChildren[k] == nodeChildren[j].feild_name[9]._) {
					childArray[j].imagePath = this.getImage(nodeChildren[j].feild_name[7]._, nodeChildren[j].feild_name[3]._, nodeChildren[j].feild_name[8]._);
					// Compare first level and their respective buNode
					if (nodeChildren[j].buNode) {
						if (nodeChildren[j].buNode.GroupBuNode.length) {
							for (let g = 0; g < nodeChildren[j].buNode.GroupBuNode.length; g++) {
								// 3rd level
								subChildArray.push({
									key: '2-' + k + '-' + g,
									label: nodeChildren[j].buNode.GroupBuNode[g].FIELD_NM[9]._,
									data: nodeChildren[j].buNode.GroupBuNode[g].FIELD_NM[9]._,
									// icon: 'pi pi-fw pi-calendar',
									imagePath: this.getImage(nodeChildren[j].buNode.GroupBuNode[g].FIELD_NM[7]._, nodeChildren[j].buNode.GroupBuNode[g].FIELD_NM[3]._, nodeChildren[j].buNode.GroupBuNode[g].FIELD_NM[8]._),
									children: subChildArrayFor4thLevel
								}); // Collect buNode groups for first level
								let u;
								if (nodeChildren[j].buNode.GroupBuNode[g].BuNode) {
									if (nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.length) {
										for (let h = 0; h < nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.length; h++) {
											u = h;
											subChildArrayFor4thLevel.push({
												key: '2-' + k + '-' + g + '-' + h,
												label: nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode[h].FIELD_NM[9]._,
												data: nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode[h].FIELD_NM[9]._,
												imagePath: this.getImage(nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode[h].FIELD_NM[7]._, nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode[h].FIELD_NM[3]._, nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode[h].FIELD_NM[8]._),
												children: subChildArrayFor5thLevel
											});
										}
									} else {
										subChildArrayFor4thLevel.push({
											key: '2-' + k + '-' + g + '-0',
											label: nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.FIELD_NM[9]._,
											data: nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.FIELD_NM[9]._,
											imagePath: this.getImage(nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.FIELD_NM[7]._, nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.FIELD_NM[3]._, nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.FIELD_NM[8]._),

											children: subChildArrayFor5thLevel
										});

										if (nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode) {
											if (nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode.length) {
												for (let l = 0; l < nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode.length; l++) {
													subChildArrayFor5thLevel.push({
														key: '2-' + k + '-' + g + '-' + u + '-' + l,
														label: nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode[l].FIELD_NM[9]._,
														data: nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode[l].FIELD_NM[9]._,
														imagePath: this.getImage(
															nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode[l].FIELD_NM[7]._,
															nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode[l].FIELD_NM[3]._,
															nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode[l].FIELD_NM[8]._
														),

														children: []
													});
												}
											} else {
												subChildArrayFor5thLevel.push({
													key: '2-' + k + '-' + g + '-0' + '-0',
													label: nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode.FIELD_NM[9]._,
													data: nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode.FIELD_NM[9]._,
													imagePath: this.getImage(
														nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode.FIELD_NM[7]._,
														nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode.FIELD_NM[3]._,
														nodeChildren[j].buNode.GroupBuNode[g].BuNode.GroupBuNode.BuNode.GroupBuNode.FIELD_NM[8]._
													),

													children: []
												});
											}
										} else {
											subChildArrayFor5thLevel = [];
										}
										subChildArrayFor5thLevel = [];
									}
								} else {
									subChildArrayFor4thLevel = [];
								}
								subChildArrayFor4thLevel = [];
							}
						} else {
							subChildArray.push({
								key: '2-' + k + '-0',
								label: nodeChildren[j].buNode.GroupBuNode.FIELD_NM[9]._,
								data: nodeChildren[j].buNode.GroupBuNode.FIELD_NM[9]._,
								// icon: 'pi pi-fw pi-calendar',
								imagePath: this.getImage(nodeChildren[j].feild_name[7]._, nodeChildren[j].feild_name[3]._, nodeChildren[j].feild_name[8]._),
								children: subChildArrayFor4thLevel
							});
						}
					} else {
						subChildArray = []; // Collect buNode groups for first level
					}
					subChildArray = [];
				}
			}
		}

		/**Final Tree Draw */
		this.treeObject = [
			{
				key: '0',
				label: treeData[0].FIELD_NM[2]._,
				data: 'Events Folder',
				// icon: 'pi pi-fw pi-calendar',
				// imagePath: 'assets/layout/images/tree/System_OPEN.gif',
				imagePath: this.getImage(treeData[0].FIELD_NM[2]._, '', ''),

				children: []
			},
			{
				key: '1',
				label: treeData[0].FIELD_NM[4]._,
				data: 'Events Folder',
				imagePath: this.getImage(treeData[0].FIELD_NM[4]._, '', ''),

				children: []
			},
			{
				key: '2',
				label: treeData[1].FIELD_NM[9]._,
				data: 'Events Folder',
				imagePath: this.getImage(treeData[1].FIELD_NM[7]._, '', ''),
				children: childArray
			}
		];
	}
	/*********************************************************/
	/* @function for draw tree image with received object ****/
	/*********************************************************/
	getImage(buTp?, scIn?, custIn?) {
		let imgUrl: string;
		if (buTp == 'SYSTEM') {
			imgUrl = AppSettings.Base_Image_URL + 'System_OPEN.gif';
		} else if (buTp == 'CBR') {
			imgUrl = AppSettings.Base_Image_URL + 'ControlBranch_CLOSED.gif';
		} else if (buTp == 'TREASURY SECURITY') {
			imgUrl = AppSettings.Base_Image_URL + 'TreasurySecurity_CLOSED.gif';
		} else if ('BRN' == buTp) {
			if ('Y' == scIn) {
				imgUrl = AppSettings.Base_Image_URL + 'SettlementBranch_CLOSED.gif';
			} else if ('Y' == custIn) {
				imgUrl = AppSettings.Base_Image_URL + 'CustodianBusinessUnitBranch_CLOSED.gif';
			} else {
				imgUrl = AppSettings.Base_Image_URL + 'Branch_CLOSED.gif';
			}
		} else if ('THP' == buTp) {
			if ('Y' == scIn) {
				imgUrl = AppSettings.Base_Image_URL + 'SettlementThirdParty_CLOSED.gif';
			} else if ('Y' == custIn) {
				imgUrl = AppSettings.Base_Image_URL + 'CustodianBusinessUnitTP_CLOSED.gif';
			} else {
				imgUrl = AppSettings.Base_Image_URL + 'ThirdParty_CLOSED.gif';
			}
		} else if ('USM' == buTp) {
			imgUrl = AppSettings.Base_Image_URL + 'UserMember_CLOSED.gif';
		} else if ('NG' == buTp) {
			imgUrl = AppSettings.Base_Image_URL + 'NettingGroup_CLOSED.gif';
		} else {
			alert('unknown bu type : ' + buTp);
		}

		return imgUrl;
	}

	onTabOpen(e) {
		this.activeIndx = e.index;
	}

	search(event: AutoCompleteCompleteEvent) {
		this.suggestions = this.APPCONSTANT.buTrees;

		let filtered: any[] = [];
		let query = event.query;

		for (let i = 0; i < (this.suggestions as any[]).length; i++) {
			let country = (this.suggestions as any[])[i];
			if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(country);
			}
		}
		this.suggestions = filtered;
	}

	CBFlag = 0;

	expandTree(event: any) {
		if (event.node.parent.label == 'Tree Explorer') {
			this.loadParentXML(event.node.label);
		}
	}
	/***********************************************************************************************************/
	/* @function On BuTree Clicked item of Model objects i.e. "Menu" & "Queue Explorer" changed and append  ****/
	/***********************************************************************************************************/
	onButreeClick(event) {
		let treeNode = event.target.innerText;
		this.queueName = treeNode;
		if (treeNode) {
			this.activeIndx = 2;
		} else {
			return;
		}

		if (treeNode == 'SYSTEM') {
			// Flush the "Menu" and "Queue Explorer array and append with respective selections."
			this.model[2].items = [];
			this.model[0].items = [];

			this.layoutService.gridHeader.next('System');

			this.layoutService.isSelection = true;
			if (this.currentSelection == 'Processing') {
				for (let i = 0; i < this.model.length; i++) {
					if (this.model[i].label == 'Queue Explorer') {
						this.model[i].items.push({
							label: 'Configuration & Setup',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Pending',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/grid-list/location-list'] },
										{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/grid-list/legal-entity-list'] },
										{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
									]
								},
								{
									label: 'Active',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
									]
								},
								{
									label: 'Rejected',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
									]
								}
							]
						});
					}

					/** Menu items appending on the basis of tree item selection */

					if (this.model[i].label == 'Menu') {
						this.model[i].items.push(
							{
								label: 'SMC',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{
										label: 'Session Control',
										icon: 'pi pi-fw pi-bookmark'
									},
									{
										label: 'Tuxedo Queue Monitor',
										icon: 'pi pi-fw pi-bookmark'
									}
								]
							},
							{
								label: 'Configuration & Setup',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{
										label: 'Create',
										icon: 'pi pi-fw pi-bookmark',
										items: [
											{ label: 'Location', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/location'] },
											{ label: 'Legal Entity', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/legal-entity'] },
											{ label: 'Bank Relationship', icon: 'pi pi-fw pi-bookmark' },
											{ label: 'Bank Location', icon: 'pi pi-fw pi-bookmark' },
											{ label: 'Fund Group', icon: 'pi pi-fw pi-bookmark' },
											{ label: 'Financial Pool', icon: 'pi pi-fw pi-bookmark' }
										]
									}
								]
							},
							{
								label: 'Table Maintenance',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Bank Identifier', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Currency Holiday', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Payment Method cuttoff', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'External Interface', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Currency Maintenance', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Interdiction', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Exchange Rate ', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Processing ICA Rules', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Fund Manager', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Process Uploaded Funds', icon: 'pi pi-fw pi-bookmark' },
									{
										label: 'Counterparty ALGD List',
										icon: 'pi pi-fw pi-bookmark'
									},
									{ label: 'Static Data Request', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Static Data Bulk Create', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'MI Auto Replay', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Static Data Bulk Amend', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Netting Groups', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Static Data Delete', icon: 'pi pi-fw pi-bookmark' }
								]
							}
							// {
							// 	label: 'Dashboard View',
							// 	icon: 'pi pi-fw pi-bookmark',
							// 	routerLink: ['/dashboard']
							// }
						);
						// this.layoutService.gridHeader.next('System');
					}
				}
			} else {
				for (let i = 0; i < this.model.length; i++) {
					if (this.model[i].label == 'Queue Explorer') {
						this.model[i].items.push({
							label: 'Configuration & Setup',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Pending',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/grid-list/location-list'] },
										{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/grid-list/legal-entity-list'] },
										{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
									]
								},
								{
									label: 'Active',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
									]
								},
								{
									label: 'Rejected',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Location (80)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Legal Entity (57)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Relationship (21)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Bank Location (45)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Business Unit (50)', icon: 'pi pi-fw pi-bookmark' },
										{ label: 'Financial Pool (56)', icon: 'pi pi-fw pi-bookmark' }
									]
								}
							]
						});
					}

					/** Menu items appending on the basis of tree item selection */

					if (this.model[i].label == 'Menu') {
						this.model[i].items
							.push

							// {
							// 	label: 'Dashboard View',
							// 	icon: 'pi pi-fw pi-bookmark',
							// 	routerLink: ['/dashboard']
							// }
							();
						// this.layoutService.gridHeader.next('System');
					}
				}
			}
		}

		if (treeNode == 'TREASURY SECURITY') {
			// Flush the "Menu" and "Queue Explorer array and append with respective selections."

			this.model[2].items = [];
			this.model[0].items = [];

			this.layoutService.gridHeader.next('TREASURY SECURITY');
			this.layoutService.isSelection = true;
			if (this.currentSelection == 'Processing') {
				for (let i = 0; i < this.model.length; i++) {
					if (this.model[i].label == 'Queue Explorer') {
						this.model[i].items.push({
							label: 'Configuration & Setup',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Pending',
									icon: 'pi pi-fw pi-bookmark',
									items: [{ label: 'Department (21)', icon: 'pi pi-fw pi-bookmark' }]
								},
								{
									label: 'Active',
									icon: 'pi pi-fw pi-bookmark',
									items: [{ label: 'Department (21)', icon: 'pi pi-fw pi-bookmark' }]
								},
								{
									label: 'Rejected',
									icon: 'pi pi-fw pi-bookmark',
									items: [{ label: 'Department (21)', icon: 'pi pi-fw pi-bookmark' }]
								}
							]
						});
					}

					if (this.model[i].label == 'Menu') {
						this.model[i].items.push(
							{
								label: 'Configuration & Setup',
								icon: 'pi pi-fw pi-bookmark',
								items: [{ label: 'Create', icon: 'pi pi-fw pi-bookmark', items: [{ label: 'Department', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/location'] }] }]
							}
							// {
							// 	label: 'Dashboard View',
							// 	icon: 'pi pi-fw pi-bookmark',
							// 	routerLink: ['/dashboard']
							// }
						);
						this.layoutService.gridHeader.next('Dashboard View');
					}
				}
			} else {
				for (let i = 0; i < this.model.length; i++) {
					if (this.model[i].label == 'Queue Explorer') {
						this.model[i].items.push({
							label: 'Configuration & Setup',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Pending',
									icon: 'pi pi-fw pi-bookmark',
									items: [{ label: 'Department (21)', icon: 'pi pi-fw pi-bookmark' }]
								},
								{
									label: 'Active',
									icon: 'pi pi-fw pi-bookmark',
									items: [{ label: 'Department (21)', icon: 'pi pi-fw pi-bookmark' }]
								},
								{
									label: 'Rejected',
									icon: 'pi pi-fw pi-bookmark',
									items: [{ label: 'Department (21)', icon: 'pi pi-fw pi-bookmark' }]
								}
							]
						});
					}

					if (this.model[i].label == 'Menu') {
						this.model[i].items.push(
							{
								label: 'User Administration',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{
										label: 'Create',
										icon: 'pi pi-fw pi-bookmark',
										items: [
											{ label: 'Role Class', icon: 'pi pi-fw pi-bookmark' },
											{ label: 'Role ', icon: 'pi pi-fw pi-bookmark' }
										]
									},
									{
										label: 'Reports',
										icon: 'pi pi-fw pi-bookmark'
									},
									{
										label: 'Static Data Delete',
										icon: 'pi pi-fw pi-bookmark'
									}
								]
							},
							{
								label: 'Reports',
								icon: 'pi pi-fw pi-bookmark',
								routerLink: []
							}
						);
						this.layoutService.gridHeader.next('Dashboard View');
					}
				}
			}
		}
		if (treeNode == 'Control Branch') {
			// Flush the "Menu" and "Queue Explorer array and append with respective selections."

			this.model[2].items = [];
			this.model[0].items = [];

			this.layoutService.gridHeader.next('Control Branch');
			this.layoutService.isSelection = true;

			for (let i = 0; i < this.model.length; i++) {
				if (this.model[i].label == 'Queue Explorer') {
					this.model[i].items.push(
						{
							label: 'Trades',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{ label: 'In-CLS', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Final', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'UDQ', icon: 'pi pi-fw pi-bookmark' }
							]
						},
						{ label: 'Pay-In', icon: 'pi pi-fw pi-bookmark' },
						{ label: 'Pay-Out', icon: 'pi pi-fw pi-bookmark' },
						{ label: 'SMC', icon: 'pi pi-fw pi-bookmark' }
					);
				}

				if (this.model[i].label == 'Menu') {
					this.model[i].items.push(
						{
							label: 'Trades',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Alleged/Unmatched',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'UDQ',
									icon: 'pi pi-fw pi-bookmark'
								}
							]
						},
						{
							label: 'Pay-In',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Create',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'UDQ',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Create UDQ', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/location'] },
										{ label: 'Delete UDQ', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/legal-entity'] }
									]
								}
							]
						},
						{
							label: 'Pay-Out',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Create',
									icon: 'pi pi-fw pi-bookmark'
								},
								{
									label: 'UDQ',
									icon: 'pi pi-fw pi-bookmark',
									items: [
										{ label: 'Create UDQ', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/location'] },
										{ label: 'Delete UDQ', icon: 'pi pi-fw pi-bookmark', routerLink: ['/configuration-and-setup/legal-entity'] }
									]
								}
							]
						},
						{
							label: 'SMC',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{ label: 'Main Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Payments Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Liquidity Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Exception Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Settlement', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Accounting Entries', icon: 'pi pi-fw pi-bookmark' }
							]
						},
						{
							label: 'Configuration & Setup',
							icon: 'pi pi-fw pi-bookmark',
							items: [
								{
									label: 'Create',
									icon: 'pi pi-fw pi-bookmark'
								},
								{ label: 'Main Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Payments Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Liquidity Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Exception Monitoring', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Settlement', icon: 'pi pi-fw pi-bookmark' },
								{ label: 'Accounting Entries', icon: 'pi pi-fw pi-bookmark' }
							]
						},
						// {
						// 	label: 'Dashboard View',
						// 	icon: 'pi pi-fw pi-bookmark',
						// 	routerLink: ['/dashboard']
						// },
						{ label: 'Reports', icon: 'pi pi-fw pi-bookmark' }
					);
					this.layoutService.gridHeader.next('Dashboard View');
				}
			}
		}
		let found = false;
		this.treeObject.forEach((node) => {
			if (node.label == treeNode) {
				this.changeFont = true;
				this.matchString = node.label;
			}
		});
		for (let r = 0; r < this.treeObject[2].children.length; r++) {
			this.treeObject[2].children.forEach((node) => {
				if (node.label.trim() == treeNode) {
					this.matchString = node.label;
				}
			});
			this.treeObject[2].children[r].children.forEach((node) => {
				if (node.label.trim() == treeNode) {
					this.matchString = node.label;
				}
			});

			for (let k = 0; k < this.treeObject[2].children[r].children.length; k++) {
				this.treeObject[2].children[r].children[k].children.forEach((node) => {
					if (node.label.trim() == treeNode) {
						this.matchString = node.label;
					}
				});
				for (let l = 0; l < this.treeObject[2].children[r].children[k].children.length; l++) {
					this.treeObject[2].children[r].children[k].children[l].children.forEach((node) => {
						if (node.label.trim() == treeNode) {
							this.matchString = node.label;
						}
					});
				}
			}
		}
	}
	/*****************************************************************/
	/* @function get version call to display respective version   ****/
	/******************************************************* *********/
	getVersionDetailCall() {
		let AdditionalParameters = '@FORM_NAME@=frmVersion&@COMMAND_EVENT@=eventGetVersion';
		let data1: any = `
		   @FORM_NAME@: frmVersion
		   @COMMAND_EVENT@: eventGetVersion
		   paramNmSeq: 1egv1jld1k741j0s1ldi1lll1nce1fgc1jsu1fnn1h0y1d261dgc1b3c1egv1b4m1dia1d401h1o1fnf1jsw1fgi1ndc1lk51le01j021k721jm51egv
		   FPRINT: 18qe19q1194s1abc19j21bpb19j41abq194y19qd18qw`;

		this.authService.getVersionDetails(data1, AdditionalParameters).subscribe(
			(response: any) => {
				this.version = this.commonService.xmlToJson(response.body);
			},
			(error) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servlet Exception! Please contact PAYplus for CLS Administrator.' });
			}
		);
	}

	activeIndexChange(index: number) {
		this.activeIndex = index;
		this.isCollapse = false;
	}
}
