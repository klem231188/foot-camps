import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RegistrationV2} from '../../../../models/registration-v2.model';
import {FootballCamp} from '../../../../models/football-camp';
import {Session} from '../../../../models/session';
import {FootballCampService} from '../../../../services/football-camp/football-camp.service';
import {SessionService} from '../../../../services/session/session.service';
import {map} from 'rxjs/operators';
import {PaymentMode} from 'app/models/payment-mode.enum';

@Component({
  selector: 'app-step-payment',
  templateUrl: './step-payment.component.html',
  styleUrls: ['./step-payment.component.scss']
})
export class StepPaymentComponent implements OnInit, OnChanges {

  @Input() campId: string;
  @Input() sessionId: string;
  @Input() registration: RegistrationV2;
  @Output() isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  footballCamp$: Observable<FootballCamp> = null;
  isButtonDisabled = false;
  PaymentMode = PaymentMode;
  session$: Observable<Session> = null;

  constructor(
    private footballCampService: FootballCampService,
    private sessionService: SessionService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('StepPaymentComponent.ngOnChanges()');
    if (changes['campId'] !== null) {
      console.log('changes[\'campId\']');
      this.footballCamp$ = this.footballCampService.getFootballCamp(this.campId);
    }

    if (changes['sessionId'] !== null) {
      console.log('changes[\'sessionId\']');
      this.session$ = this.sessionService
        .getSessionsFromCampId(this.campId)
        .pipe(
          map((sessions: Session[]) => {
            return sessions.find(session => session && session.id === this.sessionId)
          })
        );
    }

    if (changes['registration'] !== null) {
      console.log('changes[\'registration\']');
      console.log(this.registration);
    }
  }

  ngOnInit(): void {
  }

  onIsValid(event: boolean) {
    this.isValid.next(event)
  }
}
