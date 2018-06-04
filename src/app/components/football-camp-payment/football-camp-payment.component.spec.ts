import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FootballCampPaymentComponent} from './football-camp-payment.component';

describe('FootballCampPaymentComponent', () => {
  let component: FootballCampPaymentComponent;
  let fixture: ComponentFixture<FootballCampPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
