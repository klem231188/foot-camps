import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationSessionsComponent } from './football-camp-registration-sessions.component';

describe('FootballCampRegistrationSessionsComponent', () => {
  let component: FootballCampRegistrationSessionsComponent;
  let fixture: ComponentFixture<FootballCampRegistrationSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
