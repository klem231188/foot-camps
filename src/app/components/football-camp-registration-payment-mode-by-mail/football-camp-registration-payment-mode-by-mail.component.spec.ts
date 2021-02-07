import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationPaymentModeByMailComponent } from './football-camp-registration-payment-mode-by-mail.component';

describe('FootballCampRegistrationPaymentModeByMailComponent', () => {
  let component: FootballCampRegistrationPaymentModeByMailComponent;
  let fixture: ComponentFixture<FootballCampRegistrationPaymentModeByMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationPaymentModeByMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationPaymentModeByMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
