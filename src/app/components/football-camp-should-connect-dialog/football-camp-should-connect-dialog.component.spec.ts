import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampShouldConnectDialogComponent } from './football-camp-should-connect-dialog.component';

describe('FootballCampShouldConnectDialogComponent', () => {
  let component: FootballCampShouldConnectDialogComponent;
  let fixture: ComponentFixture<FootballCampShouldConnectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampShouldConnectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampShouldConnectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
