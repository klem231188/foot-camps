import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCampPrintEquipmentComponent } from './football-camp-print-equipment.component';

describe('FootballCampPrintEquipmentComponent', () => {
  let component: FootballCampPrintEquipmentComponent;
  let fixture: ComponentFixture<FootballCampPrintEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCampPrintEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCampPrintEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
