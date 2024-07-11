import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayplusGridComponent } from './payplus-grid.component';

describe('PayplusGridComponent', () => {
  let component: PayplusGridComponent;
  let fixture: ComponentFixture<PayplusGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayplusGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayplusGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
