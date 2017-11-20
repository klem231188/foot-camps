import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationComponent } from './football-camp-registration.component';

describe('FootballCampRegistrationComponent', () => {
  let component: FootballCampRegistrationComponent;
  let fixture: ComponentFixture<FootballCampRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
