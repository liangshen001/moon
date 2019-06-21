import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs/operators';
import {
    AddGroupGrouping,
    AddGroupGroupingSuccess,
    DeleteGroupGrouping,
    DeleteGroupGroupingSuccess,
    GroupGroupingActionTypes,
    LoadGroupGroupings,
    LoadGroupGroupingsSuccess,
    RenameGroupGrouping
} from '../actions/group-grouping.action';
import {GroupGroupingService} from '../services/group-grouping.service';
import {NgxElectronDataService} from '@ngx-electron/data';


@Injectable()
export class GroupGroupingEffect {

    @Effect()
    loadGroupGroupings$ = this.actions$.pipe(
        ofType<LoadGroupGroupings>(GroupGroupingActionTypes.LoadGroupGroupings),
        switchMap(() => this.groupGroupingService.findGroupGroupings()),
        map(groupGroupings => new LoadGroupGroupingsSuccess(groupGroupings))
    );

    @Effect({dispatch: false})
    renameGroupGrouping$ = this.actions$.pipe(
        ofType<RenameGroupGrouping>(GroupGroupingActionTypes.RenameGroupGrouping),
        map(action => action.payload),
        switchMap(({id, name}) => this.groupGroupingService.renameGroupGrouping(id, name))
    );

    @Effect({dispatch: false})
    addGroupGrouping$ = this.actions$.pipe(
        ofType<AddGroupGrouping>(GroupGroupingActionTypes.AddGroupGrouping),
        map(action => action.payload),
        switchMap(({id, name}) => this.groupGroupingService.addGroupGrouping(name).pipe(
            tap(groupGrouping => this.electronStoreService.dispatch(
                new AddGroupGroupingSuccess({id, newId: groupGrouping.id})))
        )),
    );

    @Effect({dispatch: false})
    deleteGroupGrouping$ = this.actions$.pipe(
        ofType<DeleteGroupGrouping>(GroupGroupingActionTypes.DeleteGroupGrouping),
        map(action => action.payload),
        switchMap(id => this.groupGroupingService.deleteGroupGrouping(id)),
        map(groupGrouping => groupGrouping.id),
        tap(id => this.electronStoreService.dispatch(new DeleteGroupGroupingSuccess(id))),
    );


    constructor(
        private actions$: Actions,
        private electronStoreService: NgxElectronDataService,
        private groupGroupingService: GroupGroupingService
    ) {}
}
