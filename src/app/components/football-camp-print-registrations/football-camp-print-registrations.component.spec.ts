import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampPrintRegistrationsComponent } from './football-camp-print-registrations.component';

describe('FootballCampPrintRegistrationsComponent', () => {
  let component: FootballCampPrintRegistrationsComponent;
  let fixture: ComponentFixture<FootballCampPrintRegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampPrintRegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampPrintRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
