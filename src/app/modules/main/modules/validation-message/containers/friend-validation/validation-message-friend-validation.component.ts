import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUserEntities} from '../../../../reducers';
import {Subscription} from 'rxjs';
import {FriendValidation} from '../../../../models/friend-validation';
import {map} from 'rxjs/operators';
import {User} from '../../../../../../models/user.model';
import {AddStatus} from '../../../../enums/add-status';

@Component({
    selector: 'app-validation-message-friend-validation',
    templateUrl: 'validation-message-friend-validation.component.html',
    styleUrls: ['validation-message-friend-validation.component.scss']
})

export class ValidationMessageFriendValidationComponent implements OnInit, OnDestroy {

    @Input()
    friendValidation: FriendValidation;

    user: User;

    private _sub: Subscription;

    isApplicant: boolean;

    constructor(private store$: Store<any>) {
    }

    ngOnInit() {
        this._sub = this.store$.pipe(
            select(getUserEntities),
            map(entities => [entities[this.friendValidation.applicantId], entities[this.friendValidation.userId]])
        ).subscribe(([applicant, user]) => {
            if (user) {
                this.user = user;
                this.isApplicant = false;
            } else {
                this.user = applicant;
                this.isApplicant = true;
            }
            console.log(this.isApplicant);
        });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    close(/*id: number*/) {

    }

    ignore(/*id: number*/) {

    }

    agree(/*id: number*/) {

    }
    reject(/*id: number*/) {

    }

    isOperation() {
        return !this.isApplicant && this.friendValidation.status === AddStatus.WAITING;
    }
}
