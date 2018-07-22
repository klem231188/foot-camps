import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationCheckPaymentComponent } from './football-camp-registration-check-payment.component';

describe('FootballCampRegistrationCheckPaymentComponent', () => {
  let component: FootballCampRegistrationCheckPaymentComponent;
  let fixture: ComponentFixture<FootballCampRegistrationCheckPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationCheckPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationCheckPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
