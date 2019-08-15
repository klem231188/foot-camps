import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {RegistrationService} from '../../../services/registration/registration.service';
import {RegistrationV2} from '../../../models/registration-v2.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-football-camp-admin-dashboard-registration-table',
  templateUrl: './football-camp-admin-dashboard-registration-table.component.html',
  styleUrls: ['./football-camp-admin-dashboard-registration-table.component.scss']
})
export class FootballCampAdminDashboardRegistrationTableComponent implements AfterViewChecked, OnChanges, OnInit {

  dataSource: MatTableDataSource<RegistrationV2>;
  displayedColumns: string[] = ['select', 'firstname', 'lastname', 'state'];
  loading: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() registrationSelected: EventEmitter<RegistrationV2>;
  registrations: RegistrationV2[];
  selection: SelectionModel<RegistrationV2>;
  @Input() sessionId: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private registrationService: RegistrationService
  ) {
    this.registrationSelected = new EventEmitter();
  }

  isRegistrationSelected(registration: RegistrationV2) {
    return this.selection.isSelected(registration);
  }

  ngAfterViewChecked(): void {
    console.log('FootballCampAdminDashboardRegistrationTableComponent.ngAfterViewChecked()');
    if (!this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (!this.dataSource.sort) {
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        let data = '';

        switch (property) {
          case 'firstname':
            data = item.trainee.firstname;
            break;
          case 'lastname':
            data = item.trainee.lastname;
            break;
          default:
            data = item[property];
            break;
        }

        return data.toLocaleLowerCase();
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FootballCampAdminDashboardRegistrationTableComponent.ngOnChanges()');

    const sessionIdChange: SimpleChange = changes['sessionId'];

    if (sessionIdChange.previousValue !== sessionIdChange.currentValue) {
      this.registrationService
        .getRegistrations(this.sessionId)
        .subscribe((registrations: RegistrationV2[]) => {
          console.log('Registrations have changed !');
          console.log(this.selection);
          this.registrations = registrations;
          this.dataSource.data = this.registrations;
          this.selection.clear();
          if (this.registrations.length > 0) {
            this.selection.select(this.registrations[0]);
          }
          this.loading = false;
        });
    }
  }

  ngOnInit() {
    console.log('FootballCampAdminDashboardRegistrationTableComponent.ngOnInit()');
    this.dataSource = new MatTableDataSource();

    const allowMultiSelect = false;
    const initialSelection = [];
    const emitChanges = true;
    this.selection = new SelectionModel<RegistrationV2>(allowMultiSelect, initialSelection, emitChanges);
    this.loading = true;

    this.selection.changed
      .subscribe((selectionChanged) => {
        this.registrationSelected.emit(selectionChanged.added[0]);
      });
  }

  onClickRegistration(registration: RegistrationV2): void {
    if (!this.selection.isSelected(registration)) {
      this.selection.toggle(registration);
    } else {
      this.selection.clear();
    }
  }
}
