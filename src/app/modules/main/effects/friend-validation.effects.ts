import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {Database} from '@ngrx/db';
import {FriendValidationActionTypes, LoadFriendValidationSuccess} from '../actions/friend-validation.actions';
import {FriendValidationService} from '../services/friend-validation.service';


@Injectable()
export class FriendValidationEffects {

    @Effect()
    loadFriendValidations$ = this.actions$.pipe(
        ofType(FriendValidationActionTypes.LoadFriendValidation),
        switchMap(() => this.friendValidationService.loadFriendValidations()),
        map(friendValidations => new LoadFriendValidationSuccess(friendValidations))
    );

    constructor(
        private actions$: Actions,
        private friendValidationService: FriendValidationService,
        private db: Database
    ) {}
}
