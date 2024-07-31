import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { RestApiService } from 'src/app/modules/shared/services/rest-api.service';

@Component({
	selector: 'app-legal-entity-main',
	// standalone: true,
	// imports: [],
	templateUrl: './legal-entity-main.component.html',
	styleUrl: './legal-entity-main.component.scss'
})
export class LegalEntityMainComponent implements OnInit {
	legalEntity: FormGroup = new FormGroup({
		entityName: new FormControl(''),
		entityAddress1: new FormControl(''),
		entityAddress2: new FormControl(''),
		entityAddress3: new FormControl('')
	});
	submitted = false;

	constructor(
		private fb: FormBuilder,
		public commonService: CommonService,
		private restApiService: RestApiService,
		private messageService: MessageService
	) {}
	ngOnInit() {
		this.legalEntity = this.fb.group({
			entityName: ['', [Validators.required]],
			entityAddress1: ['', [Validators.required]],
			entityAddress2: ['', []],
			entityAddress3: ['', []]
		});

		this.commonService.returnValidation.subscribe((valiationFalg) => {
			this.submitted = true;
			if (valiationFalg == 'INVALID') {
				if (this.legalEntity.invalid) {
					return;
				}
			}

			if (valiationFalg == 'VALID') {
				if (this.legalEntity.valid) {
					this.createLegalEntity();
				}
			}
		});
	}

	createLegalEntity() {
		let data: FormData = new FormData();
		data.append('TMS_LEGAL_ENTITY.LEGAL_ENTITY_NM', this.legalEntity.controls['entityName'].value);
		data.append('TMS_LEGAL_ENTITY.LEGAL_ENTITY_AD1', this.legalEntity.controls['entityAddress1'].value);
		data.append('TMS_LEGAL_ENTITY.LEGAL_ENTITY_AD2', this.legalEntity.controls['entityAddress2'].value);
		data.append('TMS_LEGAL_ENTITY.LEGAL_ENTITY_AD3', this.legalEntity.controls['entityAddress3'].value);
		data.append('@PERMISSION@', '306');
		data.append('@USER_LOGON_ID@', '1awj1g9a1nq81n4t1tur1l6t1u9p1l8r1dox1u2g20l71h1g1h1620lf1u2u1dnx1l4j1u9t1l6h1twb1n6p1nry1g8g1ax7');
		data.append('@FORM_NAME@', 'frmConfigLegalEntityActions');
		data.append('@COMMAND_EVENT@', 'eventCreateConfigLegalEntity');
		data.append('businessUnitID', 'SYSTEM');
		data.append('FPRINT', '18jj1a4l19qf194w1awv1awv194u19pz1a4918jj');

		data.append(
			'paramNmSeq',
			'1s2q1obr1lz31tgx1jlp1obb1mcl1oi61nca1u261biw1db51ehz1k6s1l6t1l731efv1jzv1gn21bx61aqc1cwv1lei1h8b1rh51qi21pay1mke1tgl1unf1oiw1q3i1iki1kjc1kxi1p4h1d401eau1goi1guj1je81im01fnf1l6d1lll1lk51i151l6t1gg71kzq1lzf1dum1hfs1fgk1bx61aqc1cwv1km61gfz1jsw1imq1j0a1oj81lzf1o5o1hm91gfx1bhs16kf16kf16kf1ifn1hu01k091qpr1jlp1iet1h8f1hm91j7j1qpr1j021i881m681kdv1ifn1fho16yp1cwv1fgk1gn61gfr1my41ndc1iet1j0k1m681jzp1jf21n5x1km61aqc1bbr17r91ai31d991dgc1k7e1ks91lz31mdx1jem1j021gu91htc1guj1goi1biw1db51fvk1h1g1imq1pix1ftg1ks71h8b1jsi1hf61hty1qpr1htk1hfw1jt81h8j1ksn1fvu1pj91ilo1h161ftq1d991bhi1glo1gtv1hu61gu51j0s1jeo1mcp1lz31ksl1k6s1dia1db51aj717qx1baf1ap61kkg1n5l1je81k091m661j0a1ifd1nce1mz61gg71gn01fga1cv316yl1ff61iej1kej1m661i7q1j0s1qpr1j7j1hn11h8f1ifd1jlt1qpr1jzp1hti1iej16kf16kf16kf1bim1gg11hn11o4y1lyr1oju1j0k1ilo1jsu1gfz1kkg1cv31ap61bvo1fga1hfa1dwg1lyr1kzc1gfr1l6h1i0l1lll1lk51l6x1fnn1ime1jf21gtv1glo1e8o1d261p591l1k1kna1inw1q5c1ok61uoj1ti11mkg1pd01qj81rj91h8j1ld01cv31ap61bvo1gn41k031ehv1l671l6h1k7e1efr1d991bhi1u341ndg1okw1me11odj1jlt1thp1lz31od31s4c'
		);
		data.append('@SESSION_ID@', '1lt61kn21ldc1i801nru1p431k7a1vg31nbo1g131w1a1f8n1qju1e2b1dgy1k1b1mev20lf1yf01v1z1q501qic1qiy1q3u1v2f1yf620l71mbr1jyn1dho1e2z1qhg1f9z1w281g2f1ne21vgr1k6w1p5n1nqc1i7y1le61kjk1lqs');
		this.restApiService.post(data).subscribe(
			(data: any) => {
				// Success resp
			},
			(error) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servlet Exception! Please contact PAYplus for CLS Administrator.' });
			}
		);
	}

	onKeyData(event) {
		this.commonService.formObject.next(this.legalEntity);
	}
}
