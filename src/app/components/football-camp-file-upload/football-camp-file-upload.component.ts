import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {BehaviorSubject, Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';
import {DocumentType} from '../../models/document-type.enum'
import {Document} from '../../models/document.model';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-football-camp-file-upload',
  templateUrl: './football-camp-file-upload.component.html',
  styleUrls: ['./football-camp-file-upload.component.scss']
})
export class FootballCampFileUploadComponent implements OnInit, OnDestroy {
  // ----------------------------
  // Fields
  // ----------------------------
  downloadURL: string;
  @Output() document: BehaviorSubject<Document>;
  inputId: string;
  percentage: Observable<number>;
  subscriptions: Subscription[];
  title: string;
  @Input() type: DocumentType;
  @Input() inputDocument: Document;
  uploaded: BehaviorSubject<boolean>;

  // ----------------------------
  // Constructor
  // ----------------------------
  constructor(private storage: AngularFireStorage) {
    this.uploaded = new BehaviorSubject(false);
    this.document = new BehaviorSubject(null);
  }

  // ----------------------------
  // Lifecycle hooks
  // ----------------------------
  ngOnInit(): void {
    if (this.inputDocument) {
      this.document.next(this.inputDocument);
      this.type = this.document.value.type;
      this.uploaded.next(true);
      this.percentage = Observable.of(100);
      this.downloadURL = this.document.value.url;
    }

    switch (this.type) {
      case DocumentType.ASSURANCE_SCOLAIRE :
        this.title = 'Attestation assurance scolaire';
        this.inputId = 'attestation_assurance_id';
        break;
      case DocumentType.CERTIFICAT_MEDICAL :
        this.title = 'Certificat médical de moins de 3 mois ou license';
        this.inputId = 'certificat_medical_id';
        break;
      case DocumentType.FICHE_SANITAIRE :
        this.title = 'Fiche sanitaire <sup>(1)</sup>';
        this.inputId = 'fiche_sanitaire_id';
        break;
      case DocumentType.PHOTO_IDENTITE :
        this.title = 'Photo d\'identité';
        this.inputId = 'photo_identite_id';
        break;
    }

    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  // ----------------------------
  // Methods
  // ----------------------------
  uploadFile(event: FileList) {
    const file = event.item(0);

    // No file has been selected
    if (!file) {
      return;
    }

    // Say to "uploaded" status observers that file is not yet uploaded
    this.uploaded.next(false);

    // Define file path
    const filePath = `uploads/${new Date().getTime()}_${file.name}`;

    // Create a task
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.percentage = task.percentageChanges();

    // get notified when the download URL is available
    const taskSubscription = task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          // Get downloadURL
          const downloadURLSubscription = fileRef
            .getDownloadURL()
            .subscribe(downloadURL => {
              // Say to "uploaded" status observers that file has been uploaded
              this.uploaded.next(true);

              this.downloadURL = downloadURL;
              this.document.next({
                  type: this.type,
                  url: this.downloadURL
                }
              );
            });
          this.subscriptions.push(downloadURLSubscription);
        })
      )
      .subscribe();

    this.subscriptions.push(taskSubscription);
  }
}
