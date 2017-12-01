import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampLoginComponent } from './football-camp-login.component';

describe('FootballCampLoginComponent', () => {
  let component: FootballCampLoginComponent;
  let fixture: ComponentFixture<FootballCampLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
