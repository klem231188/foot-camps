import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {BehaviorSubject, Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';

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
  inputId: string;
  percentage: Observable<number>;
  subscriptions: Subscription[];
  task: AngularFireUploadTask;
  title: string;
  @Input() type: FileUploadType;
  uploaded: BehaviorSubject<boolean>;

  // ----------------------------
  // Constructor
  // ----------------------------
  constructor(private storage: AngularFireStorage) {
  }

  // ----------------------------
  // Lifecycle hooks
  // ----------------------------
  ngOnInit(): void {
    this.uploaded = new BehaviorSubject(false);

    switch (this.type) {
      case FileUploadType.ASSURANCE_SCOLAIRE :
        this.title = 'Attestation assurance scolaire';
        this.inputId = 'attestation_assurance_id';
        break;
      case FileUploadType.CERTIFICAT_MEDICAL :
        this.title = 'Certificat médical de moins de 3 mois ou license';
        this.inputId = 'certificat_medical_id';
        break;
      case FileUploadType.FICHE_SANITAIRE :
        this.title = 'Fiche sanitaire <sup>(1)</sup>';
        this.inputId = 'fiche_sanitaire_id';
        break;
      case FileUploadType.PHOTO_IDENTITE :
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
  startUpload(event: FileList) {
    console.log('startUpload');
    const file = event.item(0);

    // No file has been selected
    if (!file) {
      return;
    }

    // Say to "uploaded" status observers that file is not yet uploaded
    this.uploaded.next(false);

    // Define file path
    const path = `uploads/${new Date().getTime()}_${file.name}`;

    // Create an upload task
    this.task = this.storage.upload(path, file);

    // Keep a variable on upload percentage observable for the progress bar
    this.percentage = this.task.percentageChanges();

    this.task
      .snapshotChanges()
      .subscribe((snap) => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Upload is now finished

          // Say to "uploaded" status observers that file has been uploaded
          this.uploaded.next(true);

          // TODO: move following line when registration is done
          // this.db.collection('photos').add({path, size: snap.totalBytes});

          // Save upload full URL into a variable
          const subscription = this.storage
            .ref(path)
            .getDownloadURL()
            .subscribe(url => {
              this.downloadURL = url;
            });
          this.subscriptions.push(subscription);
        }
      });
  }
}

export enum FileUploadType {
  ASSURANCE_SCOLAIRE = 'ASSURANCE_SCOLAIRE',
  CERTIFICAT_MEDICAL = 'CERTIFICAT_MEDICAL',
  FICHE_SANITAIRE = 'FICHE_SANITAIRE',
  PHOTO_IDENTITE = 'PHOTO_IDENTITE'
}
