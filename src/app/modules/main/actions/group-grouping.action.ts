import {Action} from '@ngrx/store';
import {GroupGrouping} from '../models/group-grouping.model';


export enum GroupGroupingActionTypes {
    LoadGroupGroupings = '[Friend Group] LoadGroupGroupings',
    LoadGroupGroupingsSuccess = '[Friend Group] LoadGroupGroupingsSuccess',
    GroupGroupingOpenOrClose = '[Friend Group] GroupGroupingOpenOrClose',
    FriendDragStart = '[Friend Group] UserFriendDragStart',
    RenameGroupGrouping = '[Friend Group] RenameGroupGrouping',
    OpenRenameGroupGroupingInput = '[Friend Group] OpenRenameGroupGroupingInput',
    DeleteGroupGrouping = '[Friend Group] DeleteGroupGrouping',
    OpenAddGroupGroupingInput = '[Friend Group] OpenAddGroupGroupingInput',
    AddGroupGrouping = '[Friend Group] AddGroupGrouping',
    AddGroupGroupingSuccess = '[Friend Group] AddGroupGroupingSuccess',
    DeleteGroupGroupingSuccess = '[Friend Group] DeleteGroupGroupingSuccess',
    GroupGroupingDragStart = '[Friend Group] GroupGroupingDragStart',
    GroupGroupingChangeSort = '[Friend Group] GroupGroupingChangeSort',
}
export class GroupGroupingDragStart implements Action {
    readonly type = GroupGroupingActionTypes.GroupGroupingDragStart;
    constructor(public payload: number) {}
}
export class GroupGroupingChangeSort implements Action {
    readonly type = GroupGroupingActionTypes.GroupGroupingChangeSort;
    constructor(public payload: {id: number, changeSort: number}) {}
}
export class DeleteGroupGroupingSuccess implements Action {
    readonly type = GroupGroupingActionTypes.DeleteGroupGroupingSuccess;
    constructor(public payload: number) {}
}
export class AddGroupGroupingSuccess implements Action {
    readonly type = GroupGroupingActionTypes.AddGroupGroupingSuccess;
    constructor(public payload: {id: number, newId: number}) {}
}
export class AddGroupGrouping implements Action {
    readonly type = GroupGroupingActionTypes.AddGroupGrouping;
    constructor(public payload: {id: number, name: string}) {}
}
export class OpenAddGroupGroupingInput implements Action {
    readonly type = GroupGroupingActionTypes.OpenAddGroupGroupingInput;
}
export class DeleteGroupGrouping implements Action {
    readonly type = GroupGroupingActionTypes.DeleteGroupGrouping;
    constructor(public payload: number) {}
}
export class OpenRenameGroupGroupingInput implements Action {
    readonly type = GroupGroupingActionTypes.OpenRenameGroupGroupingInput;
    constructor(public payload: number) {}
}
export class RenameGroupGrouping implements Action {
    readonly type = GroupGroupingActionTypes.RenameGroupGrouping;
    constructor(public payload: {id: number, name: string}) {}
}
export class FriendDragStart implements Action {
    readonly type = GroupGroupingActionTypes.FriendDragStart;
}
export class GroupGroupingOpenOrClose implements Action {
    readonly type = GroupGroupingActionTypes.GroupGroupingOpenOrClose;
    // friendGroupingId
    constructor(public payload: number) {}
}

export class LoadGroupGroupings implements Action {
    readonly type = GroupGroupingActionTypes.LoadGroupGroupings;
}

export class LoadGroupGroupingsSuccess implements Action {
    readonly type = GroupGroupingActionTypes.LoadGroupGroupingsSuccess;
    constructor(public payload: GroupGrouping[]) {}
}


export type GroupGroupingActionsUnion = LoadGroupGroupings | RenameGroupGrouping |
    LoadGroupGroupingsSuccess | OpenAddGroupGroupingInput | DeleteGroupGroupingSuccess |
    GroupGroupingOpenOrClose | OpenRenameGroupGroupingInput | DeleteGroupGrouping |
    FriendDragStart | AddGroupGrouping | AddGroupGroupingSuccess |
    GroupGroupingDragStart | GroupGroupingChangeSort;
//
// export const FETCH_FRIEND_GROUPS = 'FETCH_FRIEND_GROUPS';
// export const ADD_FRIEND_GROUP = 'ADD_FRIEND_GROUP';
//
// export class FetchGroupGroupingsAction implements Action {
//     readonly type = FETCH_FRIEND_GROUPS;
//     constructor(public payload: GroupGroupinging[]) {}
// }
//
// export class AddGroupGroupingAction implements Action {
//     readonly type = ADD_FRIEND_GROUP;
//     constructor(public payload: GroupGroupinging) {}
// }
//
// export type GroupGroupingsActions = FetchGroupGroupingsAction | AddGroupGroupingAction;
//
// export class GroupGroupingsState {
//     constructor(public friendGroupings: GroupGroupinging[]) {}
// }
//
