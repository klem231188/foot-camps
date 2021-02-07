import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationPaymentModeInPersonComponent } from './football-camp-registration-payment-mode-in-person.component';

describe('FootballCampRegistrationPaymentModeInPersonComponent', () => {
  let component: FootballCampRegistrationPaymentModeInPersonComponent;
  let fixture: ComponentFixture<FootballCampRegistrationPaymentModeInPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationPaymentModeInPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationPaymentModeInPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
