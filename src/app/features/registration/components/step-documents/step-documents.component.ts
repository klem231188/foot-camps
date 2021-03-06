import {AfterViewInit, Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {FootballCampFileUploadComponent} from '../../../../components/football-camp-file-upload/football-camp-file-upload.component';
import {Document} from '../../../../models/document.model';

@Component({
  selector: 'app-step-documents',
  templateUrl: './step-documents.component.html',
  styleUrls: ['./step-documents.component.scss']
})
export class StepDocumentsComponent implements OnInit, AfterViewInit, OnDestroy {

  // @ViewChild('certificatMedical', {static: true}) certificatMedical: FootballCampFileUploadComponent;
  @Output() documents: BehaviorSubject<Document[]> = new BehaviorSubject<Document[]>(null);
  @ViewChild('ficheSanitaire', {static: true}) ficheSanitaire: FootballCampFileUploadComponent;
  @ViewChild('photoIdentite', {static: true}) photoIdentite: FootballCampFileUploadComponent;
  subscription: Subscription;
  subscription2: Subscription;
  @Output() isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  ngAfterViewInit(): void {
    this.subscription = combineLatest([
        this.ficheSanitaire.uploaded,
        this.photoIdentite.uploaded,
        // this.certificatMedical.uploaded
      ]
    ).subscribe((uploadStatuses) => {
      const areUploadedDocumentsValid = uploadStatuses.reduce((acc, cur) => acc && cur);
      this.isValid.next(areUploadedDocumentsValid);
    });

    this.subscription2 = combineLatest([
        this.ficheSanitaire.document,
        this.photoIdentite.document
        // this.certificatMedical.document,
      ]
    ).subscribe((documents) => {
      this.documents.next(documents);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  ngOnInit(): void {
  }
}
