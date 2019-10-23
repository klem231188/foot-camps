import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampActionButtonComponent } from './football-camp-action-button.component';

describe('FootballCampActionButtonComponent', () => {
  let component: FootballCampActionButtonComponent;
  let fixture: ComponentFixture<FootballCampActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
