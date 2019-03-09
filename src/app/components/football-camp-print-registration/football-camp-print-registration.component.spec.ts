import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampPrintRegistrationComponent } from './football-camp-print-registration.component';

describe('FootballCampPrintRegistrationComponent', () => {
  let component: FootballCampPrintRegistrationComponent;
  let fixture: ComponentFixture<FootballCampPrintRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampPrintRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampPrintRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
