import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubheaderToolbarComponent } from './subheader-toolbar.component';

describe('SubheaderToolbarComponent', () => {
  let component: SubheaderToolbarComponent;
  let fixture: ComponentFixture<SubheaderToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubheaderToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubheaderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
