import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampDetailsV2Component } from './football-camp-details-v2.component';

describe('FootballCampDetailsV2Component', () => {
  let component: FootballCampDetailsV2Component;
  let fixture: ComponentFixture<FootballCampDetailsV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampDetailsV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampDetailsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
