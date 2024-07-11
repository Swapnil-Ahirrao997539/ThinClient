import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankScreenComponent } from './blank-screen.component';

describe('BlankScreenComponent', () => {
  let component: BlankScreenComponent;
  let fixture: ComponentFixture<BlankScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlankScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
