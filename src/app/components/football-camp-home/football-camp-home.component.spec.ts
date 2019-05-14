import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampHomeComponent } from './football-camp-home.component';

describe('FootballCampHomeComponent', () => {
  let component: FootballCampHomeComponent;
  let fixture: ComponentFixture<FootballCampHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
