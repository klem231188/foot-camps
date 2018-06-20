import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampRegistrationDocumentsComponent } from './football-camp-registration-documents.component';

describe('FootballCampRegistrationDocumentsComponent', () => {
  let component: FootballCampRegistrationDocumentsComponent;
  let fixture: ComponentFixture<FootballCampRegistrationDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampRegistrationDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampRegistrationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
