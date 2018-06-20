import {AfterViewInit, Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs/Rx';
import {FootballCampFileUploadComponent} from '../football-camp-file-upload/football-camp-file-upload.component';

@Component({
  selector: 'app-football-camp-registration-documents',
  templateUrl: './football-camp-registration-documents.component.html',
  styleUrls: ['./football-camp-registration-documents.component.scss']
})
export class FootballCampRegistrationDocumentsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() valid: BehaviorSubject<boolean>;
  subscription: Subscription;

  @ViewChild('ficheSanitaire') ficheSanitaire: FootballCampFileUploadComponent;
  @ViewChild('certificatMedical') certificatMedical: FootballCampFileUploadComponent;
  @ViewChild('assuranceScolaire') assuranceScolaire: FootballCampFileUploadComponent;
  @ViewChild('photoIdentite') photoIdentite: FootballCampFileUploadComponent;

  constructor() {
    this.valid = new BehaviorSubject<boolean>(false);
  }

  // Lifecycle hooks

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.subscription = Observable
      .combineLatest(
        this.ficheSanitaire.uploaded,
        this.certificatMedical.uploaded,
        this.assuranceScolaire.uploaded,
        this.photoIdentite.uploaded
      )
      .subscribe((uploadStatuses) => {
        console.log(uploadStatuses);
        this.valid.next(uploadStatuses.reduce((accumulator, currentValue) => {
          return accumulator && currentValue;
        }));
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
