import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FootballCampRegistrationCardPaymentComponent} from './football-camp-registration-card-payment.component';

describe('FootballCampRegistrationCardPaymentComponent', () => {
  let component: FootballCampRegistrationCardPaymentComponent;
  let fixture: ComponentFixture<FootballCampRegistrationCardPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationCardPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationCardPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
