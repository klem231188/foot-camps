import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RegistrationV2} from '../../models/registration-v2.model';
import {Session} from '../../models/session';
import {FootballCamp} from '../../models/football-camp';
import {BehaviorSubject, combineLatest} from 'rxjs';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-football-camp-registration-export',
  templateUrl: './football-camp-registration-export.component.html',
  styleUrls: ['./football-camp-registration-export.component.scss']
})
export class FootballCampRegistrationExportComponent implements OnInit {

  registration: RegistrationV2;
  session: Session;
  camp: FootballCamp;

  ball1Loaded: BehaviorSubject<boolean>;
  ball2Loaded: BehaviorSubject<boolean>;
  logoLoaded: BehaviorSubject<boolean>;

  constructor(public dialogRef: MatDialogRef<FootballCampRegistrationExportComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RegistrationExportData) {
  }

  ngOnInit(): void {
    this.registration = this.data.registration;
    this.session = this.data.session;
    this.camp = this.data.camp;

    this.ball1Loaded = new BehaviorSubject(false);
    this.ball2Loaded = new BehaviorSubject(false);
    this.logoLoaded = new BehaviorSubject(false);

    combineLatest(
      this.ball1Loaded.asObservable(),
      this.ball2Loaded.asObservable(),
      this.logoLoaded.asObservable(),
    ).subscribe((imagesLoadedStatus) => {
        console.log(imagesLoadedStatus);
        const unloadedImages = imagesLoadedStatus.filter((loaded) => loaded !== true);
        if (unloadedImages.length > 0) {
          console.log('time to sleep !');
        } else {
          console.log('time to print !');
          setTimeout(() => {
            this.print();
          }, 3000);
          // this.print();
        }
      }
    );
  }

  print() {
    const node = document.getElementById('print');
    htmlToImage.toJpeg(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.jpg';
        link.href = dataUrl;
        link.click();
        this.dialogRef.close();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }
}


export interface RegistrationExportData {
  registration: RegistrationV2;
  session: Session;
  camp: FootballCamp;
}
