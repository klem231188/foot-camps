import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FootballCampFileUploadComponent} from './football-camp-file-upload.component';

describe('FootballCampFileUploadComponent', () => {
  let component: FootballCampFileUploadComponent;
  let fixture: ComponentFixture<FootballCampFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
