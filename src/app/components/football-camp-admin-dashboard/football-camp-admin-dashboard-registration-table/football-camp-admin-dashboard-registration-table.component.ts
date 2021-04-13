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
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Payment} from '../../../models/payment';
import {PaymentService} from '../../../services/payment/payment.service';

@Component({
  selector: 'app-football-camp-admin-dashboard-registration-table',
  templateUrl: './football-camp-admin-dashboard-registration-table.component.html',
  styleUrls: ['./football-camp-admin-dashboard-registration-table.component.scss']
})
export class FootballCampAdminDashboardRegistrationTableComponent implements AfterViewChecked, OnChanges, OnInit {

  dataSource: MatTableDataSource<RegistrationV2>;
  destroyed: Subject<any>;
  disablePrintEquipmentButton: boolean;
  disablePrintRegistrationsButton: boolean;
  displayedColumns: string[] = [];
  loading: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() registrationSelected: EventEmitter<RegistrationV2>;
  registrations: RegistrationV2[];
  payments: Payment[] = [];
  selection: SelectionModel<RegistrationV2>;
  @Input() sessionId: string;
  @Input() adminMode: boolean;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private registrationService: RegistrationService,
    private paymentService: PaymentService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.registrationSelected = new EventEmitter();
  }

  getPayment(registrationId: string): Payment {
    return this.payments.find(p => p.registrationId === registrationId)
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
          case 'id':
            data = item.id;
            break;
          case 'firstname':
            data = item.trainee.firstname;
            break;
          case 'lastname':
            data = item.trainee.lastname;
            break;
          case 'state':
            data = item.state;
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
    this.disablePrintRegistrationsButton = false;

    if (this.adminMode) {
      this.displayedColumns = ['select', 'firstname', 'lastname', 'id', 'state', 'payment-state'];
    } else {
      this.displayedColumns = ['firstname', 'lastname', 'state'];
    }

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

    this.paymentService
      .getPayments()
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        (payments) => this.payments = payments
      );

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
        element.download = 'equipements.pdf';
        element.href = URL.createObjectURL(response.body);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // Enable button again
        this.disablePrintEquipmentButton = false;

        // Says to user that's everything is fine
        this.snackBar.open(
          'Rapport équipements téléchargé',
          'Fermer',
          {duration: 5000});
      }, (error) => {
        console.log(error);

        // Enable button again
        this.disablePrintEquipmentButton = false;

        // Says to user that an error occured
        this.snackBar.open(
          'Une erreur est survenue lors du téléchargement du rapport équipements',
          'Fermer',
          {duration: 5000});
      });
  }

  printRegistrations() {
    const url: string = environment.urlPrintRegistrations;

    const body = {
      sessionId: this.sessionId,
    };

    const options = {
      observe: 'response' as 'body', // hack for TS
      responseType: 'blob' as 'json', // hack for TS
    };

    // Disable button
    this.disablePrintRegistrationsButton = true;

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
        element.download = 'inscriptions.pdf';
        element.href = URL.createObjectURL(response.body);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // Enable button again
        this.disablePrintRegistrationsButton = false;

        // Says to user that's everything is fine
        this.snackBar.open(
          'Rapport inscriptions téléchargé',
          'Fermer',
          {duration: 5000});
      }, (error) => {
        console.log(error);

        // Enable button again
        this.disablePrintRegistrationsButton = false;

        // Says to user that an error occured
        this.snackBar.open(
          'Une erreur est survenue lors du téléchargement du rapport inscriptions',
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
