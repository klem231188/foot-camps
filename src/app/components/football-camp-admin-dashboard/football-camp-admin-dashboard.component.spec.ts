import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampAdminDashboardComponent } from './football-camp-admin-dashboard.component';

describe('FootballCampAdminDashboardComponent', () => {
  let component: FootballCampAdminDashboardComponent;
  let fixture: ComponentFixture<FootballCampAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
