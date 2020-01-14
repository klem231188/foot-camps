import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampPrintReceiptComponent } from './football-camp-print-receipt.component';

describe('FootballCampPrintReceiptComponent', () => {
  let component: FootballCampPrintReceiptComponent;
  let fixture: ComponentFixture<FootballCampPrintReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampPrintReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampPrintReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
