import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampBadgeComponent } from './football-camp-badge.component';

describe('FootballCampBadgeComponent', () => {
  let component: FootballCampBadgeComponent;
  let fixture: ComponentFixture<FootballCampBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
