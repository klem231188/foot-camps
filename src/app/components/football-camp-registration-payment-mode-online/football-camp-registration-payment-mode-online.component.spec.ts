import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationPaymentModeOnlineComponent } from './football-camp-registration-payment-mode-online.component';

describe('FootballCampRegistrationPaymentModeOnlineComponent', () => {
  let component: FootballCampRegistrationPaymentModeOnlineComponent;
  let fixture: ComponentFixture<FootballCampRegistrationPaymentModeOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationPaymentModeOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationPaymentModeOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
