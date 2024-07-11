import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-legal-entity',
  // standalone: true,
  // imports: [],
  templateUrl: './legal-entity.component.html',
  styleUrl: './legal-entity.component.scss'
})
export class LegalEntityComponent implements OnInit{
  gridHeader:any;
  dt = ['Location','Legal Entity'];
  items: MenuItem[] | undefined;
  public data;   

  home: MenuItem | undefined;
  urlLink = 'assets/demo/data/products.json';

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
    // this.param1 = this.route.snapshot.params.;


  }

  
}
