import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Database} from '@ngrx/db';
import {Observable} from 'rxjs/internal/Observable';
import {
    AddAsFriends,
    ChangeFriendToMyFriendFriendGrouping,
    DeleteUserFriend,
    DeleteUserFriendSuccess,
    FriendChangeFriendGrouping,
    LoadUserFriends,
    LoadUserFriendsSuccess,
    UpdateUserFriend,
    UserFriendActionTypes
} from '../actions/user-friend.actions';
import {UserFriend} from '../models/user-friend.model';
import {UserFriendService} from '../services/user-friend.service';
import {getAllFriendGroupings} from '../reducers';
import {DeleteFriendGroupingSuccess, FriendGroupingActionTypes} from '../actions/friend-grouping.action';
import {FriendGroupingType} from '../models/friend-grouping-type.enum';
import {NgxElectronDataService} from '@ngx-electron/data';


@Injectable()
export class UserFriendEffects {

    @Effect()
    loadUserFriends$: Observable<Action> = this.actions$.pipe(
        ofType<LoadUserFriends>(UserFriendActionTypes.LoadUserFriends),
        switchMap(() => this.userFriendService.loadUserFriends()),
        map<UserFriend[], LoadUserFriendsSuccess>(userFriends => new LoadUserFriendsSuccess(userFriends))
    );

    @Effect({dispatch: false})
    deleteUserFriend$: Observable<any> = this.actions$.pipe(
        ofType<DeleteUserFriend>(UserFriendActionTypes.DeleteUserFriend),
        map(action => action.payload),
        switchMap(id => this.userFriendService.deleteFriends(id)),
        tap(userFriend => this.electronStoreService.dispatch(new DeleteUserFriendSuccess(userFriend.id))),
    );

    @Effect({dispatch: false})
    addAsFriends$ = this.actions$.pipe(
        ofType<AddAsFriends>(UserFriendActionTypes.AddAsFriends),
        map(action => action.payload),
        switchMap(body => this.userFriendService.addAsFriends(body)),
        tap(userFriend => this.electronStoreService.dispatch(new DeleteUserFriendSuccess(userFriend.id))),
    );

    @Effect({dispatch: false})
    friendChangeFriendGrouping$ = this.actions$.pipe(
        ofType<FriendChangeFriendGrouping>(UserFriendActionTypes.FriendChangeFriendGrouping),
        map(action => action.payload),
        switchMap(({id, friendGroupingId}) => this.userFriendService.updateUserFriend(id, {
            friendGroupingId
        }))
    );

    @Effect({dispatch: false})
    updateUserFriend$: Observable<any> = this.actions$.pipe(
        ofType<UpdateUserFriend>(UserFriendActionTypes.UpdateUserFriend),
        map(action => action.payload),
        switchMap(({id, changes}) => this.userFriendService.updateUserFriend(id, changes))
    );

    @Effect()
    deleteFriendGroupingSuccess$ = this.actions$.pipe(
        ofType<DeleteFriendGroupingSuccess>(FriendGroupingActionTypes.DeleteFriendGroupingSuccess),
        map(action => action.payload),
        switchMap(friendGroupingId => this.store$.pipe(
            select(getAllFriendGroupings),
            take(1),
            map(friendGroupings => friendGroupings.find(fg =>
                fg.type === FriendGroupingType.MY_FRIENDS).id),
            map(myFriendFriendGroupingId => new ChangeFriendToMyFriendFriendGrouping({
                friendGroupingId, myFriendFriendGroupingId
            }))
        ))
    );

    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private userFriendService: UserFriendService,
        private electronStoreService: NgxElectronDataService
    ) {
    }
}
