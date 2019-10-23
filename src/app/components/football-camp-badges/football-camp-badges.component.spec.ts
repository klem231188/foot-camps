import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampBadgesComponent } from './football-camp-badges.component';

describe('FootballCampBadgesComponent', () => {
  let component: FootballCampBadgesComponent;
  let fixture: ComponentFixture<FootballCampBadgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampBadgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
