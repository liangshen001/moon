import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {map, switchMap, tap} from 'rxjs/operators';
import {
    AddFriendGrouping,
    AddFriendGroupingSuccess,
    DeleteFriendGrouping,
    DeleteFriendGroupingSuccess,
    FriendGroupingActionTypes,
    FriendGroupingChangeSort,
    LoadFriendGroupings,
    LoadFriendGroupingsSuccess,
    RenameFriendGrouping,
    UpdateFriendGrouping
} from '../actions/friend-grouping.action';
import {Observable} from 'rxjs/internal/Observable';
import {FriendGroupingService} from '../services/friend-grouping.service';
import {FriendGrouping} from '../models/friend-grouping.model';
import {NgxElectronDataService} from '@ngx-electron/data';


@Injectable()
export class FriendGroupingEffects {

    @Effect()
    load$: Observable<Action> = this.actions$.pipe(
        ofType<LoadFriendGroupings>(FriendGroupingActionTypes.LoadFriendGroupings),
        switchMap(() => this.friendGroupingService.findFriendGroupings()),
        map<FriendGrouping[], LoadFriendGroupingsSuccess>(friendGroups => new LoadFriendGroupingsSuccess(friendGroups)),
    );

    @Effect({dispatch: true})
    renameFriendGrouping$ = this.actions$.pipe(
        ofType<RenameFriendGrouping>(FriendGroupingActionTypes.RenameFriendGrouping),
        map(action => action.payload),
        switchMap(({id, name}) => this.friendGroupingService.updateFriendGrouping(id, {name})),
        // map(res => res.data),
        map(friendGroup => new RenameFriendGroupingSuccess(friendGroup))
    );

    @Effect({dispatch: false})
    updateFriendGrouping$ = this.actions$.pipe(
        ofType<UpdateFriendGrouping>(FriendGroupingActionTypes.UpdateFriendGrouping),
        map(action => action.payload),
        switchMap(({id, changes}) => this.friendGroupingService.updateFriendGrouping(id, changes)),
    );

    @Effect({dispatch: false})
    addFriendGrouping$ = this.actions$.pipe(
        ofType<AddFriendGrouping>(FriendGroupingActionTypes.AddFriendGrouping),
        map(action => action.payload),
        switchMap(({id, name}) => this.friendGroupingService.addFriendGrouping(name).pipe(
            tap(friendGrouping => this.electronStoreService.dispatch(
                new AddFriendGroupingSuccess({id, newId: friendGrouping.id})))
        )),
    );

    @Effect({dispatch: false})
    deleteFriendGrouping$ = this.actions$.pipe(
        ofType<DeleteFriendGrouping>(FriendGroupingActionTypes.DeleteFriendGrouping),
        map(action => action.payload),
        tap(id => this.electronStoreService.dispatch(new DeleteFriendGroupingSuccess(id))),
        switchMap(id => this.friendGroupingService.deleteFriendGrouping(id)),
    );

    @Effect({dispatch: false})
    friendGroupingChangeSort$ = this.actions$.pipe(
        ofType<FriendGroupingChangeSort>(FriendGroupingActionTypes.FriendGroupingChangeSort),
        map(action => action.payload),
        switchMap(({id, changeSort}) => this.friendGroupingService.updateFriendGrouping(id, {
            sort: changeSort
        }))
    );

    constructor(
        private actions$: Actions,
        private friendGroupingService: FriendGroupingService,
        private electronStoreService: NgxElectronDataService
    ) {}
}
