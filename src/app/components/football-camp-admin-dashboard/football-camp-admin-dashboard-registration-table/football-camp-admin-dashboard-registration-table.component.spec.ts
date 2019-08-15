import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampAdminDashboardRegistrationTableComponent } from './football-camp-admin-dashboard-registration-table.component';

describe('FootballCampAdminDashboardRegistrationTableComponent', () => {
  let component: FootballCampAdminDashboardRegistrationTableComponent;
  let fixture: ComponentFixture<FootballCampAdminDashboardRegistrationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampAdminDashboardRegistrationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampAdminDashboardRegistrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
