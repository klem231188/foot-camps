import {Component, OnInit, ViewChild} from '@angular/core';
import {FootballCamp} from '../../models/football-camp';
import {Subject} from 'rxjs';
import {Session} from '../../models/session';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {switchMap, tap} from 'rxjs/operators';
import {MatVerticalStepper} from '@angular/material/stepper';
import {FootballCampRegistrationTraineeFormComponent} from '../../components/football-camp-registration-trainee-form/football-camp-registration-trainee-form.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  campId = '';
  footballCamp: FootballCamp = null;
  reloadSubject: Subject<void> = new Subject<void>();
  sessions: Session[] = [];
  isStepSessionValid = false;
  isStepTraineeFormValid = false;

  @ViewChild('stepper') stepper: MatVerticalStepper;
  @ViewChild(FootballCampRegistrationTraineeFormComponent) traineeFormComponent: FootballCampRegistrationTraineeFormComponent;

  constructor(
    private footballCampService: FootballCampService,
    private route: ActivatedRoute,
    private sessionService: SessionService
  ) {
  }

  ngOnInit(): void {
    console.log('FootballCampDetailsV2Component.ngOnInit()');
    this.reloadSubject.subscribe(() => this.reload());
    this.route.params.pipe(
      tap((params: Params) => this.campId = params['id']),
      tap(() => this.reloadSubject.next())
    ).subscribe();
  }

  reload() {
    this.footballCampService
      .getFootballCamp(this.campId)
      .pipe(
        tap(footballCamp => this.footballCamp = footballCamp),
        switchMap(() => this.sessionService.getSessionsFromCampId(this.campId)),
        tap(sessions => {
          this.sessions = sessions;
        })
      )
      .subscribe();
  }
}
