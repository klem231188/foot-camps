import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {BehaviorSubject, combineLatest, of, Subject} from 'rxjs';
import {Document} from '../../../../models/document.model';
import {FileUploadComponent} from '../../../../shared/components/file-upload/file-upload.component';
import {FootballCampService} from '../../../../services/football-camp/football-camp.service';
import {catchError, switchMap, takeUntil, tap} from 'rxjs/operators';
import {DocumentType} from '../../../../models/document-type.enum';

@Component({
  selector: 'app-step-documents',
  templateUrl: './step-documents.component.html',
  styleUrls: ['./step-documents.component.scss']
})
export class StepDocumentsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() campId: string;
  @Output() documents: BehaviorSubject<Document[]> = new BehaviorSubject<Document[]>(null);
  @Output() isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ViewChildren(FileUploadComponent) fileUploadComponents!: QueryList<FileUploadComponent>;
  reloadSubject$: Subject<void> = new Subject();
  unsubscribe$: Subject<void> = new Subject();
  isLoading = false;
  documentTypes: DocumentType[];

  constructor(
    private footballCampService: FootballCampService
  ) {
  }

  ngAfterViewInit(): void {

    combineLatest(
      this.fileUploadComponents.map(fuc => fuc.uploaded)
    ).subscribe((uploadStatuses) => {
      const areUploadedDocumentsValid = uploadStatuses.reduce((acc, cur) => acc && cur);
      this.isValid.next(areUploadedDocumentsValid);
    });

    combineLatest(
      this.fileUploadComponents.map(fuc => fuc.document)
    ).subscribe((documents) => {
      this.documents.next(documents);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.reloadSubject$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.isLoading = true),
        switchMap(() => this.footballCampService.getFootballCamp(this.campId)),
        tap(camp => {
          this.documentTypes = camp.registrationDocuments;
        }),
        tap(() => this.isLoading = false),
        catchError((err) => {
          console.error(err);
          this.isLoading = false
          return of(null);
        })
      )
      .subscribe()

    this.reloadSubject$.next();
  }
}
