import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RegistrationV2} from '../../models/registration-v2.model';
import {FootballCamp} from '../../models/football-camp';
import {Session} from '../../models/session';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {map} from 'rxjs/operators';
import {PaymentMode} from 'app/models/payment-mode.enum';

@Component({
  selector: 'app-football-camp-registration-payment-mode',
  templateUrl: './football-camp-registration-payment-mode.component.html',
  styleUrls: ['./football-camp-registration-payment-mode.component.scss']
})
export class FootballCampRegistrationPaymentModeComponent implements OnInit, OnChanges {

  PaymentMode = PaymentMode;
  @Input() campId: string;
  footballCamp$: Observable<FootballCamp>;
  isButtonDisabled: boolean;
  @Output() isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() registration: RegistrationV2;
  session$: Observable<Session>;
  @Input() sessionId: string;

  constructor(
    private footballCampService: FootballCampService,
    private sessionService: SessionService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FootballCampRegistrationPaymentModeComponent.ngOnChanges()');
    if (changes['campId'] !== null) {
      this.footballCamp$ = this.footballCampService.getFootballCamp(this.campId);
    }

    if (changes['sessionId'] !== null) {
      this.session$ = this.sessionService
        .getSessionsFromCampId(this.campId)
        .pipe(
          map((sessions: Session[]) => {
            return sessions.find(session => session && session.id === this.sessionId)
          })
        );
    }

    if (changes['registration'] !== null) {
      console.log("changes['registration']");
      console.log(this.registration);
    }
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationPaymentModeComponent.ngOnInit()');
    this.isButtonDisabled = false;
  }

  onIsValid(event: boolean) {
    this.isValid.next(event)
  }
}
