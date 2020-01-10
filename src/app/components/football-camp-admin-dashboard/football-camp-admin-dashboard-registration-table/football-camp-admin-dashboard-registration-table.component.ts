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
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-football-camp-admin-dashboard-registration-table',
  templateUrl: './football-camp-admin-dashboard-registration-table.component.html',
  styleUrls: ['./football-camp-admin-dashboard-registration-table.component.scss']
})
export class FootballCampAdminDashboardRegistrationTableComponent implements AfterViewChecked, OnChanges, OnInit {

  dataSource: MatTableDataSource<RegistrationV2>;
  destroyed: Subject<any>;
  disablePrintEquipmentButton: boolean;
  displayedColumns: string[] = ['select', 'firstname', 'lastname', 'state'];
  loading: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() registrationSelected: EventEmitter<RegistrationV2>;
  registrations: RegistrationV2[];
  selection: SelectionModel<RegistrationV2>;
  @Input() sessionId: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private registrationService: RegistrationService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.registrationSelected = new EventEmitter();
  }

  isRegistrationSelected(registration: RegistrationV2) {
    return this.selection.isSelected(registration);
  }

  ngAfterViewChecked(): void {
    if (this.dataSource.paginator !== this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.dataSource.sort !== this.sort) {
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
    this.disablePrintEquipmentButton = false;

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

  printEquipment(): void {
    const url: string = environment.urlPrintEquipment;

    const body = {
      sessionId: this.sessionId,
    };

    const options = {
      observe: 'response' as 'body', // hack for TS
      responseType: 'blob' as 'json', // hack for TS
    };

    // Disable button
    this.disablePrintEquipmentButton = true;

    // Says to user to wait ( Duration ~ 10 seconds)
    this.snackBar.open(
      'Veuillez patentier quelques secondes',
      'Fermer',
      {duration: 5000});

    this.http
      .post(url, body, options)
      .subscribe((response: HttpResponse<Blob>) => {

        // Create an anchor element, to be able to rename and download file.
        const element: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        element.download = 'equipement.pdf';
        element.href = URL.createObjectURL(response.body);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // Enable button again
        this.disablePrintEquipmentButton = false;

        // Says to user that's everything is fine
        this.snackBar.open(
          'Rapport équipement téléchargé',
          'Fermer',
          {duration: 5000});
      }, (error) => {
        console.log(error);

        // Enable button again
        this.disablePrintEquipmentButton = false;

        // Says to user that an error occured
        this.snackBar.open(
          'Une erreur est survenue lors du téléchargement du rapport équipement',
          'Fermer',
          {duration: 5000});
      });
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
