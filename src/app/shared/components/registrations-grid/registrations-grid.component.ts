import {AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {RegistrationService} from '../../../services/registration/registration.service';
import {RegistrationV2} from '../../../models/registration-v2.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Payment} from '../../../models/payment';
import {PaymentService} from '../../../services/payment/payment.service';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-registrations-grid',
  templateUrl: './registrations-grid.component.html',
  styleUrls: ['./registrations-grid.component.scss']
})
export class RegistrationsGridComponent implements AfterViewChecked, OnChanges, OnInit {

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
    private snackBar: MatSnackBar,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registrationSelected = new EventEmitter();
    this.matIconRegistry.addSvgIcon(
      `male_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/male.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `female_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/female.svg`)
    );
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
          case 'gender':
            data = item.trainee.gender;
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
      this.displayedColumns = ['select', 'firstname', 'lastname', 'gender', 'id', 'state', 'payment-state'];
    } else {
      this.displayedColumns = ['firstname', 'lastname', 'gender', 'state'];
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
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/print/equipment`], {queryParams: {sessionId: this.sessionId}})
    );
    this.router.navigateByUrl(url);
  }

  printRegistrations() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/print/registrations`], {queryParams: {sessionId: this.sessionId}})
    );
    this.router.navigateByUrl(url);
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
