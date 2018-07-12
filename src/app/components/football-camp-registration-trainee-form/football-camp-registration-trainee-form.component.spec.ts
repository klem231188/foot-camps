import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationTraineeFormComponent } from './football-camp-registration-trainee-form.component';

describe('FootballCampRegistrationTraineeFormComponent', () => {
  let component: FootballCampRegistrationTraineeFormComponent;
  let fixture: ComponentFixture<FootballCampRegistrationTraineeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationTraineeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationTraineeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
