import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {Database} from '@ngrx/db';
import {GroupSystemMessageActionTypes, LoadGroupSystemMessagesSuccess} from '../actions/group-system-message.actions';
import {GroupSystemMessageService} from '../services/group-system-message.service';


@Injectable()
export class GroupSystemMessageEffects {

    @Effect()
    loadGroupSystemMessages$ = this.actions$.pipe(
        ofType(GroupSystemMessageActionTypes.LoadGroupSystemMessages),
        switchMap(() => this.groupSystemMessageService.loadGroupSystemMessages()),
        map(groupSystemMessages => new LoadGroupSystemMessagesSuccess(groupSystemMessages))
    );

    constructor(
        private actions$: Actions,
        private groupSystemMessageService: GroupSystemMessageService,
        private db: Database
    ) {}
}
