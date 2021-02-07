import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationPaymentModeComponent } from './football-camp-registration-payment-mode.component';

describe('FootballCampRegistrationPaymentModeComponent', () => {
  let component: FootballCampRegistrationPaymentModeComponent;
  let fixture: ComponentFixture<FootballCampRegistrationPaymentModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationPaymentModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationPaymentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
