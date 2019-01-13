import {Action} from '@ngrx/store';
import {GroupStatus} from '../enums/group-status';
import {UserGroup} from '../models/user-group.model';
import {User} from '../../../models/user.model';

export enum UserGroupActionTypes {
    LoadUserGroupsSuccess = '[UserGroup] Load UserGroups Success',
    LoadUserGroups = '[UserGroup] Load UserGroups',
    AddUserGroups = '[UserGroup] Add UserGroups',
    AddUserGroupsSuccess = '[UserGroup] Add UserGroups Success',
    UpdateUserGroup = '[UserGroup] UpdateUserGroup',
    ExitUserGroup = '[UserGroup] Exit UserGroup',
    GroupChangeGroupGrouping = '[UserGroup] GroupChangeGroupGrouping',
    ChangeGroupToSystemGroupGrouping = '[UserGroup] ChangeGroupToSystemGroupGrouping',
    UserGroupDragStart = '[UserGroup] UserGroupDragStart'
}
export class UserGroupDragStart implements Action {
    readonly type = UserGroupActionTypes.UserGroupDragStart;
}
export class ChangeGroupToSystemGroupGrouping implements Action {
    readonly type = UserGroupActionTypes.ChangeGroupToSystemGroupGrouping;
    constructor(public payload: {systemGroupGroupingId: number, groupGroupingId: number}) {}
}
export class GroupChangeGroupGrouping implements Action {
    readonly type = UserGroupActionTypes.GroupChangeGroupGrouping;
    constructor(public payload: {id: number, groupGroupingId: number}) {}
}
export class UpdateUserGroup implements Action {
    readonly type = UserGroupActionTypes.UpdateUserGroup;
    constructor(public payload: {
        id: number,
        changes: {
            groupStatus?: GroupStatus,
            remark?: string
        }
    }) {}
}
export class LoadUserGroupsSuccess implements Action {
    readonly type = UserGroupActionTypes.LoadUserGroupsSuccess;
    constructor(public payload: UserGroup[]) {}
}
export class LoadUserGroups implements Action {
    readonly type = UserGroupActionTypes.LoadUserGroups;
    constructor(public payload?: number) {}
}
export class AddUserGroups implements Action {
    readonly type = UserGroupActionTypes.AddUserGroups;
    constructor(public payload: {
        inviteeIds: number[],
        groupId: number
    }) {}
}
export class AddUserGroupsSuccess implements Action {
    readonly type = UserGroupActionTypes.AddUserGroupsSuccess;
    constructor(public payload: UserGroup[]) {}
}
export class ExitUserGroup implements Action {
    readonly type = UserGroupActionTypes.ExitUserGroup;
    constructor(public payload: number) {}
}

export type UserGroupAction = LoadUserGroupsSuccess | LoadUserGroups
    | AddUserGroups | AddUserGroupsSuccess | UpdateUserGroup
    | ExitUserGroup | UserGroupDragStart | GroupChangeGroupGrouping | ChangeGroupToSystemGroupGrouping;
//
// export const FETCH_FRIEND_GROUPS = 'FETCH_FRIEND_GROUPS';
// export const ADD_FRIEND_GROUP = 'ADD_FRIEND_GROUP';
//
// export class FetchFriendUserGroupsAction implements Action {
//     readonly type = FETCH_FRIEND_GROUPS;
//     constructor(public payload: FriendUserGrouping[]) {}
// }
//
// export class AddFriendUserGroupAction implements Action {
//     readonly type = ADD_FRIEND_GROUP;
//     constructor(public payload: FriendUserGrouping) {}
// }
//
// export type FriendUserGroupsActions = FetchFriendUserGroupsAction | AddFriendUserGroupAction;
//
// export class FriendUserGroupsState {
//     constructor(public friendUserGroupings: FriendUserGrouping[]) {}
// }
//
