import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AngularFirestore} from 'angularfire2/firestore';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-football-camp-file-upload',
  templateUrl: './football-camp-file-upload.component.html',
  styleUrls: ['./football-camp-file-upload.component.scss']
})
export class FootballCampFileUploadComponent implements OnInit {

  @Input() type: FileUploadType;
  title: string;
  inputId: string;
  uploaded: BehaviorSubject<boolean>;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) {
  }

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
  }

  startUpload(event: FileList) {
    console.log('startUpload');
    const file = event.item(0);

    if (!file) {
      return;
    }

    this.uploaded.next(false);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    const path = `uploads/${new Date().getTime()}_${file.name}`;
    console.log(path);

    const customMetadata = {app: 'My AngularFire-powered PWA!'};
    this.task = this.storage.upload(path, file, {customMetadata});

    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges()
      .subscribe((snap) => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.db.collection('photos').add({path, size: snap.totalBytes});
          this.uploaded.next(true);
          this.storage.ref(path).getDownloadURL().subscribe(url => {
            this.downloadURL = url
          });
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
