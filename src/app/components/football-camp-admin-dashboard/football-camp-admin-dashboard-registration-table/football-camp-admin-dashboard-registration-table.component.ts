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
import {takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-football-camp-admin-dashboard-registration-table',
  templateUrl: './football-camp-admin-dashboard-registration-table.component.html',
  styleUrls: ['./football-camp-admin-dashboard-registration-table.component.scss']
})
export class FootballCampAdminDashboardRegistrationTableComponent implements AfterViewChecked, OnChanges, OnInit {

  dataSource: MatTableDataSource<RegistrationV2>;
  destroyed: Subject<any>;
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

    if (!sessionIdChange.isFirstChange() && (sessionIdChange.previousValue !== sessionIdChange.currentValue)) {
      console.log(`Session has changed ${sessionIdChange.currentValue}`);
      this.sessionId = sessionIdChange.currentValue;

      // Unsubscribe for change on previous session
      this.destroyed.next();

      // Clear selection
      this.selection.clear();

      // Reload
      this.reload();
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

    this.destroyed = new Subject();

    this.reload()
  }

  onClickRegistration(registration: RegistrationV2): void {
    if (!this.selection.isSelected(registration)) {
      this.selection.toggle(registration);
    } else {
      this.selection.clear();
    }
  }

  reload() {
    this.loading = true;
    this.registrationService
      .getRegistrations(this.sessionId)
      .pipe(takeUntil(this.destroyed))
      .subscribe((registrations: RegistrationV2[]) => {
          console.log('Registrations have changed !');
          this.registrations = registrations;
          this.dataSource.data = this.registrations;
          if (this.registrations.length > 0) {
            if (this.selection.selected.length > 0) {
              const registration = this.registrations.find(r => r.id === this.selection.selected[0].id);
              this.selection.clear();
              this.selection.select(registration);
            } else {
              this.selection.select(this.registrations[0]);
            }
          }
          this.loading = false;
        }
      );
  }
}
