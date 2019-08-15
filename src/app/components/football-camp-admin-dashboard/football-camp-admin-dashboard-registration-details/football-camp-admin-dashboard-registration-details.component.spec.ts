import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampAdminDashboardRegistrationDetailsComponent } from './football-camp-admin-dashboard-registration-details.component';

describe('FootballCampAdminDashboardRegistrationDetailsComponent', () => {
  let component: FootballCampAdminDashboardRegistrationDetailsComponent;
  let fixture: ComponentFixture<FootballCampAdminDashboardRegistrationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampAdminDashboardRegistrationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampAdminDashboardRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
