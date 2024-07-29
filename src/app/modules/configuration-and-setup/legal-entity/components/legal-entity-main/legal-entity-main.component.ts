import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
	constructor(private fb: FormBuilder) {}
	ngOnInit() {
		this.legalEntity = this.fb.group({
			entityName: ['', [Validators.required]],
			entityAddress1: ['', [Validators.required]],
			entityAddress2: ['', [Validators.required]],
			entityAddress3: ['', [Validators.required]]
		});
	}
}
