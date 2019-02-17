import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationExportComponent } from './football-camp-registration-export.component';

describe('FootballCampRegistrationExportComponent', () => {
  let component: FootballCampRegistrationExportComponent;
  let fixture: ComponentFixture<FootballCampRegistrationExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
