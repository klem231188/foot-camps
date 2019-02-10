import {AfterViewInit, Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs/Rx';
import {FootballCampFileUploadComponent} from '../football-camp-file-upload/football-camp-file-upload.component';
import {Document} from '../../models/document.model';

@Component({
  selector: 'app-football-camp-registration-documents',
  templateUrl: './football-camp-registration-documents.component.html',
  styleUrls: ['./football-camp-registration-documents.component.scss']
})
export class FootballCampRegistrationDocumentsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() valid: BehaviorSubject<boolean>;
  @Output() documents: BehaviorSubject<Document[]>;
  subscription: Subscription;
  subscription2: Subscription;

  @ViewChild('ficheSanitaire') ficheSanitaire: FootballCampFileUploadComponent;
  @ViewChild('certificatMedical') certificatMedical: FootballCampFileUploadComponent;
  //@ViewChild('assuranceScolaire') assuranceScolaire: FootballCampFileUploadComponent;
  @ViewChild('photoIdentite') photoIdentite: FootballCampFileUploadComponent;

  constructor() {
  }

  // Lifecycle hooks
  ngOnInit(): void {
    this.valid = new BehaviorSubject<boolean>(false);
    this.documents = new BehaviorSubject<Document[]>(null);
  }

  ngAfterViewInit(): void {
    this.subscription = Observable
      .combineLatest(
        this.ficheSanitaire.uploaded,
        this.certificatMedical.uploaded,
        //this.assuranceScolaire.uploaded,
        this.photoIdentite.uploaded
      )
      .subscribe((uploadStatuses) => {
        console.log(uploadStatuses);
        this.valid.next(uploadStatuses.reduce((accumulator, currentValue) => {
          return accumulator && currentValue;
        }));
      });


    this.subscription2 = Observable
      .combineLatest(
        this.ficheSanitaire.document,
        this.certificatMedical.document,
        //this.assuranceScolaire.document,
        this.photoIdentite.document
      )
      .subscribe((documents) => {
        this.documents.next(documents);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
