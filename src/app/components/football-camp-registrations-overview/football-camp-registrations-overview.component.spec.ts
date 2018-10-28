import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationsOverviewComponent } from './football-camp-registrations-overview.component';

describe('FootballCampRegistrationsOverviewComponent', () => {
  let component: FootballCampRegistrationsOverviewComponent;
  let fixture: ComponentFixture<FootballCampRegistrationsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
