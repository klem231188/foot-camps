import {AfterViewInit, Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {FootballCampFileUploadComponent} from '../football-camp-file-upload/football-camp-file-upload.component';
import {Document} from '../../models/document.model';

@Component({
  selector: 'app-football-camp-registration-documents',
  templateUrl: './football-camp-registration-documents.component.html',
  styleUrls: ['./football-camp-registration-documents.component.scss']
})
export class FootballCampRegistrationDocumentsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('certificatMedical', { static: true }) certificatMedical: FootballCampFileUploadComponent;
  @Output() documents: BehaviorSubject<Document[]>;
  @ViewChild('ficheSanitaire', { static: true }) ficheSanitaire: FootballCampFileUploadComponent;
  @ViewChild('photoIdentite', { static: true }) photoIdentite: FootballCampFileUploadComponent;
  subscription: Subscription;
  subscription2: Subscription;
  @Output() valid: BehaviorSubject<boolean>;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.subscription = combineLatest([
        this.ficheSanitaire.uploaded,
        this.certificatMedical.uploaded,
        this.photoIdentite.uploaded
      ]
    )
      .subscribe((uploadStatuses) => {
        console.log(uploadStatuses);
        this.valid.next(uploadStatuses.reduce((accumulator, currentValue) => {
          return accumulator && currentValue;
        }));
      });


    this.subscription2 = combineLatest([
        this.ficheSanitaire.document,
        this.certificatMedical.document,
        this.photoIdentite.document
      ]
    ).subscribe((documents) => {
        this.documents.next(documents);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  // Lifecycle hooks
  ngOnInit(): void {
    this.valid = new BehaviorSubject<boolean>(false);
    this.documents = new BehaviorSubject<Document[]>(null);
  }
}
