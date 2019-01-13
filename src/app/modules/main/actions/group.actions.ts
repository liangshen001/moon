import {Action} from '@ngrx/store';
import {Group} from '../models/group.model';


export enum GroupActionTypes {
    LoadGroupsSuccess = '[Group] Load Groups Success',
    LoadGroups = '[Group] Load Groups',
    CreateGroup = '[Group] CreateGroup',
    AddGroup = '[Group] Add Group',
    AddGroupSuccess = '[Group] Add Group Success',
    GroupLoadInfo = '[Group] GroupLoadInfo'
}
export class GroupLoadInfo implements Action {
    readonly type = GroupActionTypes.GroupLoadInfo;
    constructor(public payload: number) {}
}
export class LoadGroupsSuccess implements Action {
    readonly type = GroupActionTypes.LoadGroupsSuccess;
    constructor(public payload: Group[]) {}
}
export class LoadGroups implements Action {
    readonly type = GroupActionTypes.LoadGroups;
}
export class AddGroup implements Action {
    readonly type = GroupActionTypes.AddGroup;
    constructor(public payload: any) {}
}
export class AddGroupSuccess implements Action {
    readonly type = GroupActionTypes.AddGroupSuccess;
    constructor(public payload: Group) {}
}

export type GroupActions = LoadGroupsSuccess|LoadGroups
    | AddGroup | AddGroupSuccess | GroupLoadInfo;
//
// export const FETCH_FRIEND_GROUPS = 'FETCH_FRIEND_GROUPS';
// export const ADD_FRIEND_GROUP = 'ADD_FRIEND_GROUP';
//
// export class FetchFriendGroupsAction implements Action {
//     readonly type = FETCH_FRIEND_GROUPS;
//     constructor(public payload: FriendGrouping[]) {}
// }
//
// export class AddFriendGroupAction implements Action {
//     readonly type = ADD_FRIEND_GROUP;
//     constructor(public payload: FriendGrouping) {}
// }
//
// export type FriendGroupsActions = FetchFriendGroupsAction | AddFriendGroupAction;
//
// export class FriendGroupsState {
//     constructor(public friendGroupings: FriendGrouping[]) {}
// }
//
