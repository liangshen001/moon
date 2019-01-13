import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {map, switchMap, tap} from 'rxjs/operators';
import {Database} from '@ngrx/db';
import {Observable} from 'rxjs/internal/Observable';
import {AddGroup, AddGroupSuccess, GroupActionTypes, LoadGroupsSuccess} from '../actions/group.actions';
import {GroupService} from '../services/group.service';
import {NgxElectronDataService} from '@ngx-electron/data';
import {NgxElectronService} from '@ngx-electron/core';


@Injectable()
export class GroupEffects {

    @Effect()
    loadGroups$: Observable<Action> = this.actions$.pipe(
        ofType(GroupActionTypes.LoadGroups),
        switchMap(() => this.groupService.loadGroups()),
        map(groups => new LoadGroupsSuccess(groups))
    );

    @Effect({dispatch: false})
    addGroup$ = this.actions$.pipe(
        ofType<AddGroup>(GroupActionTypes.AddGroup),
        map(action => action.payload),
        switchMap(params => this.groupService.post(params)),
        tap(group => this.store$.dispatch(new AddGroupSuccess(group))),
        tap(() => this.electronService.remote.getCurrentWindow().destroy())
    );

    constructor(
        private actions$: Actions,
        private electronService: NgxElectronService,
        private store$: NgxElectronDataService,
        private groupService: GroupService,
        private db: Database
    ) {}
}
