import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {FootballCamp} from '../../models/football-camp';
import {of, Subject, Subscription} from 'rxjs';
import {Session} from '../../models/session';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {MatVerticalStepper} from '@angular/material/stepper';
import {RegistrationV2} from '../../models/registration-v2.model';
import {RegistrationState} from '../../models/registration-state.enum';
import {StepTraineeFormComponent} from './components/step-trainee-form/step-trainee-form.component';
import {StepSessionsComponent} from './components/step-sessions/step-sessions.component';
import {StepDocumentsComponent} from './components/step-documents/step-documents.component';
import {RegistrationService} from '../../services/registration/registration.service';
import {firestore} from 'firebase';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements AfterViewChecked, OnInit {

    campId = '';
    footballCamp: FootballCamp = null;
    reloadSubject: Subject<void> = new Subject<void>();
    sessions: Session[] = [];
    isStepSessionValid = false;
    isStepTraineeFormValid = false;
    isStepDocumentsValid = false;
    isLoading = true;
    registration: RegistrationV2 = null;
    subscriptions: Subscription[] = [];
    stepperSub: Subscription = null;

    @ViewChild('stepper') stepper: MatVerticalStepper;
    @ViewChild(StepSessionsComponent) sessionComponent: StepSessionsComponent;
    @ViewChild(StepTraineeFormComponent) traineeFormComponent: StepTraineeFormComponent;
    @ViewChild(StepDocumentsComponent) documentsComponent: StepDocumentsComponent;

    constructor(
        private footballCampService: FootballCampService,
        private route: ActivatedRoute,
        private sessionService: SessionService,
        private registrationService: RegistrationService,
    ) {
    }

    buildRegistration(): RegistrationV2 {
        return {
            sessionId: this.sessionComponent.selectedSession.value.id,
            trainee: {
                firstname: this.traineeFormComponent.firstname.value,
                lastname: this.traineeFormComponent.lastname.value,
                gender: this.traineeFormComponent.gender.value,
                birthdate: firestore.Timestamp.fromDate(this.traineeFormComponent.birthdate.value.toDate()),
                email: this.traineeFormComponent.email.value,
                club: this.traineeFormComponent.club.value,
                fieldPosition: this.traineeFormComponent.fieldPosition.value,
                feet: this.traineeFormComponent.feet.value,
                shoeSize: this.traineeFormComponent.shoeSize.value,
                shortSize: this.traineeFormComponent.shortSize.value,
            },

            documents: this.documentsComponent.documents.value,
            paymentId: null,

            state: RegistrationState.PRE_REGISTERED,
        };
    }

    ngAfterViewChecked(): void {
        console.log('RegistrationComponent.ngAfterViewChecked()');
        if (this.stepper !== undefined && this.stepperSub === null) {
            this.stepperSub = this.stepper
                .selectionChange
                .subscribe((selection) => {
                    console.log('selection.selectedIndex = ' + selection.selectedIndex);
                    if (selection.selectedIndex === 3) {
                        if (this.registration) {
                            this.updateRegistration();
                        } else {
                            this.saveRegistration();
                        }
                    }
                    if (selection.selectedIndex === 4) {
                        this.stepper._steps.forEach((step) => step.editable = false);
                    }
                });
            this.subscriptions.push(this.stepperSub);
        }
    }

    ngOnInit(): void {
        console.log('RegistrationComponent.ngOnInit()');

        this.reloadSubject
            .pipe(
                tap(() => this.isLoading = true),
                tap(() => this.reload()),
                tap(() => this.isLoading = false),
                catchError(() => {
                    this.isLoading = false;
                    return of(null)
                })
            )
            .subscribe();

        this.route.params.pipe(
            tap((params: Params) => this.campId = params['id']),
            tap(() => this.reloadSubject.next())
        ).subscribe();
    }

    onPaymentValid(isValid: boolean) {
        console.log('onPaymentValid' + isValid);
        if (isValid) {
            this.stepper.selected.completed = true;
            this.stepper.next();
        }
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

    async saveRegistration() {
        try {
            this.registration = this.buildRegistration();
            this.isLoading = true;
            console.log('Saving Registration', this.registration);
            await this.registrationService.save(this.registration);
            console.log('Registration saved', this.registration);
            this.isLoading = false;
        } catch (e) {
            console.log('An error occured while saving registration');
            this.isLoading = false;
        }
    }

    async updateRegistration() {
        try {
            const registrationId = this.registration.id;
            this.registration = this.buildRegistration();
            this.registration.id = registrationId;
            this.isLoading = true;
            console.log('Updating Registration', this.registration);
            await this.registrationService.update(this.registration.id, this.registration);
            console.log('Registration updated');
            this.isLoading = false;
        } catch (e) {
            console.log('An error occured while updating registration');
            this.isLoading = false;
        }
    }
}
