import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoadUsers, LoadUsersSuccess, UserActionTypes} from '../actions/user.action';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from '../services/user.service';

@Injectable()
export class UserEffect {
    constructor(private actions$: Actions,
                private userService: UserService) {}
    @Effect()
    loadUsersSuccess$ = this.actions$.pipe(
        ofType<LoadUsers>(UserActionTypes.LoadUsers),
        map(action => action.payload),
        switchMap(groupId => this.userService.loadUsers(groupId)),
        map(res => res.data),
        map(users => new LoadUsersSuccess(users))
    );
}
