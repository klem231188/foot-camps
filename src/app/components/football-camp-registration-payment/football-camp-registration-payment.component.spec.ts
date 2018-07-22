import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FootballCampRegistrationPaymentComponent} from './football-camp-registration-payment.component';

describe('FootballCampRegistrationPaymentComponent', () => {
  let component: FootballCampRegistrationPaymentComponent;
  let fixture: ComponentFixture<FootballCampRegistrationPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
