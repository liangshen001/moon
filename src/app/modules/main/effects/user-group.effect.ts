import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';
import {
    AddUserGroups, AddUserGroupsSuccess,
    ChangeGroupToSystemGroupGrouping,
    GroupChangeGroupGrouping,
    LoadUserGroups,
    LoadUserGroupsSuccess,
    UpdateUserGroup,
    UserGroupActionTypes
} from '../actions/user-group.action';
import {UserGroupService} from '../services/user-group.service';
import {DeleteGroupGroupingSuccess, GroupGroupingActionTypes} from '../actions/group-grouping.action';
import {getAllGroupGroupings} from '../reducers';
import {select, Store} from '@ngrx/store';


@Injectable()
export class UserGroupEffects {

    @Effect()
    loadUserGroups$ = this.actions$.pipe(
        ofType<LoadUserGroups>(UserGroupActionTypes.LoadUserGroups),
        map(action => action.payload),
        switchMap(groupId => this.userGroupService.loadUserGroups(groupId)),
        map(userGroups => new LoadUserGroupsSuccess(userGroups))
    );

    @Effect({dispatch: false})
    addUserGroups$ = this.actions$.pipe(
        ofType<AddUserGroups>(UserGroupActionTypes.AddUserGroups),
        map(action => action.payload),
        switchMap(params => this.userGroupService.post(params)),
        map(userGroups => new AddUserGroupsSuccess(userGroups))
    );

    @Effect({dispatch: false})
    updateUserGroup$ = this.actions$.pipe(
        ofType<UpdateUserGroup>(UserGroupActionTypes.UpdateUserGroup),
        map(action => action.payload),
        switchMap(({id, changes}) => this.userGroupService.updateUserGroup(id, changes))
    );

    @Effect({dispatch: false})
    groupChangeGroupGrouping$ = this.actions$.pipe(
        ofType<GroupChangeGroupGrouping>(UserGroupActionTypes.GroupChangeGroupGrouping),
        map(action => action.payload),
        switchMap(({id, groupGroupingId}) => this.userGroupService.updateUserGroup(id, {
            groupGroupingId
        }))
    );

    @Effect()
    deleteGroupGroupingSuccess$ = this.actions$.pipe(
        ofType<DeleteGroupGroupingSuccess>(GroupGroupingActionTypes.DeleteGroupGroupingSuccess),
        map(action => action.payload),
        switchMap(groupGroupingId => this.store$.pipe(
            select(getAllGroupGroupings),
            take(1),
            map(groupGroupings => groupGroupings.find(gg => gg.system).id),
            map(systemGroupGroupingId => new ChangeGroupToSystemGroupGrouping({
                groupGroupingId,
                systemGroupGroupingId
            }))
        ))
    );

    constructor(
        private actions$: Actions,
        private userGroupService: UserGroupService,
        private store$: Store<any>
    ) {
    }
}
