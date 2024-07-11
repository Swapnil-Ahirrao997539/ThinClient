import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/modules/layout/services/app.layout.service';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { RestApiService } from 'src/app/modules/shared/services/rest-api.service';
import * as xml2js from 'xml2js';
import { CommonService } from 'src/app/modules/shared/services/common.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [
		`
			:host ::ng-deep .pi-eye,
			:host ::ng-deep .pi-eye-slash {
				transform: scale(1.6);
				margin-right: 1rem;
				color: var(--primary-color) !important;
			}
		`
	]
})
export class LoginComponent {
	valCheck: string[] = ['remember'];
	password!: string;
	/** Form structure for login */
	frmLogin: FormGroup = this.fb.group({
		username: ['', Validators.required],
		password: [''],
		txtUserId: [''],
		txtPasswordVisible: [''],
		txtHiddenUserId: [''],
		txtLanguage: [''],
		'@FORM_NAME@': ['frmLogin'],
		'@COMMAND_EVENT@': [''],
		'@SESSION_ID@': ['']
	});
	constructor(
		public layoutService: LayoutService,
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private _http: HttpClient,
		private messageService: MessageService,
		private restApiService: RestApiService,
		private commonService: CommonService
	) {
		this.getVersionDetailCall();
	}

	ngOnInit(): void {}
	/***
	 * Function Login Gathere credentials and verify by authentication service.
	 */

	onSubmit(event: any): void {
		if (this.frmLogin.valid) {
			const username = this.frmLogin.get('username').value;
			const password = this.frmLogin.get('password').value;
			this.loggedIn();

			// Call the authentication service's login method - Temoparay Code
			if (this.authService.login(username, password)) {
				// Navigate to the ProductListComponent upon successful login
				this.router.navigate(['/dashboard']);
			} else {
				// Handle authentication error (show error message, etc.);
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password.' });
			}
		}
	}

	/**
	 *  Prepare Form data for login request
	 **/

	loggedIn() {
		let strofbu: any = this.authService.obfuscate(this.frmLogin.controls['username'].value);
		let data1: FormData = new FormData();
		data1.append('@FORM_NAME@', 'frmLogin');
		data1.append('@COMMAND_EVENT@', 'Submit');
		data1.append('txtHiddenUserId', this.frmLogin.controls['username'].value);
		data1.append('txtPassword', '');
		data1.append('txtPasswordVisible', '');
		data1.append('txtLanguage', 'English');
		data1.append('txtUserId', strofbu);
		data1.append(
			'paramNmSeq',
			'1egv1gg11j7p1o4y1jsu1nkf1ime1hm91jeo1lk51i0d1bhi1e8o1emu1egv1b4m1dia1d401hu01gfr1rh51nbu1to01jlb1sv61pht1oiw1rhh1mja1kjc1kxi1h6x1aj71eau1biw1i8i1j0u1i0v1njj1jzz1nkf1i0v1j001i7g1bhi1e8o1ai31h9x1l1k1kna1mlk1rix1ok61pkd1sws1jm71tou1ndw1rj91gg71hti1d261dgc1b3c1egv1ep41eau1biw1i1d1lll1jem1hn11im01njj1jsw1o5o1j7d1gfx1egv'
		);
		data1.append('FPRINT', '18qm1apo194u19bz1awr1awz19bz194w1apu18qo');
		data1.append('@SESSION_ID@', '');

		this.restApiService.post(data1).subscribe(
			(data: any) => {
				// Success resp
				// let data2: FormData = new FormData();
				// data2.append('@FORM_NAME@','frmVALogin');
				// data2.append('@COMMAND_EVENT@','Submit');
				// data2.append('statusCd302','302')
				this.login302Call();
			},
			(error) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servlet Exception! Please contact PAYplus for CLS Administrator.' });
			}
		);
	}

	login302Call() {
		let AdditionalParameters = 'statusCd302=302';

		this.restApiService.post('', AdditionalParameters).subscribe(
			(data: any) => {
				// Success resp
				// Catch session ID pass to methode
			},
			(error) => {
				//alert('Internal Server Error' + '' + JSON.parse(JSON.stringify(error.status)));
			}
		);
	}

	getVersionDetailCall() {
		let AdditionalParameters = '@FORM_NAME@=frmVersion&@COMMAND_EVENT@=eventGetVersion';
		let data1: any = `
		   @FORM_NAME@: frmVersion
		   @COMMAND_EVENT@: eventGetVersion
		   paramNmSeq: 1egv1jld1k741j0s1ldi1lll1nce1fgc1jsu1fnn1h0y1d261dgc1b3c1egv1b4m1dia1d401h1o1fnf1jsw1fgi1ndc1lk51le01j021k721jm51egv
		   FPRINT: 18qe19q1194s1abc19j21bpb19j41abq194y19qd18qw`;

		this.authService.getVersionDetails(data1, AdditionalParameters).subscribe(
			(response: any) => {
				this.commonService.xmlToJson(response.body);
				this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfull Response Received!!' });
			},
			(error) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Servlet Exception! Please contact PAYplus for CLS Administrator.' });
			}
		);

		// this._http
		// 	.post(
		// 		'http://localhost:8080/thinClient/servlet/MainServlet?@FORM_NAME@=frmVersion&@COMMAND_EVENT@=eventGetVersion',
		// 		data1,
		// 		// this._http.post('http://localhost:8080/thinClient/servlet/MainServlet',data1,

		// 		{
		// 			observe: 'response',
		// 			headers: new HttpHeaders(),

		// 			responseType: 'text'
		// 		}
		// 	)
		// 	.subscribe(
		// 		(data: any) => {
		// 			debugger;
		// 			//   var parser = new DOMParser();
		// 			//   let convertedData = JSON.parse(JSON.stringify(data.body));
		// 			//   let xmlDoc = parser.parseFromString(convertedData, 'text/xml');
		// 			//   let standardObj :any = this.ngxXml2jsonService.xmlToJson(xmlDoc); // Converted into JSON
		// 			//   console.log(standardObj);
		// 			//   this.version = standardObj.GPP_VERSION_INFO.PRODUCT;
		// 			//   this.copyright = standardObj.GPP_VERSION_INFO.COPYRIGHT;
		// 			//   if(standardObj.SecurityException) {                               //**Check whether throw exception */
		// 			// 	this.route.navigate(['/servlet-exception'])   //** Redirect with error string to error page */
		// 			//   } else {
		// 			// 	this.route.navigateByUrl('/');
		// 			//   }
		// 		},
		// 		(error) => {
		// 			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password.' });
		// 		}
		// 	);
	}
}
