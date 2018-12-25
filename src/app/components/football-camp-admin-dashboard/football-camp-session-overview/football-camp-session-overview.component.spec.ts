import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampSessionOverviewComponent } from './football-camp-session-overview.component';

describe('FootballCampSessionOverviewComponent', () => {
  let component: FootballCampSessionOverviewComponent;
  let fixture: ComponentFixture<FootballCampSessionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampSessionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampSessionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
