import {Action} from '@ngrx/store';
import {FriendGrouping} from '../models/friend-grouping.model';


export enum FriendGroupingActionTypes {
    DeleteFriendGroupingSuccess = '[Friend Grouping] DeleteFriendGroupingSuccess',
    LoadFriendGroupings = '[Friend Grouping] LoadFriendGroupings',
    LoadFriendGroupingsSuccess = '[Friend Grouping] LoadFriendGroupingsSuccess',
    FriendGroupingOpenOrClose = '[Friend Grouping] FriendGroupingOpenOrClose',
    RenameFriendGrouping = '[Friend Grouping] RenameFriendGrouping',
    OpenRenameFriendGroupingInput = '[Friend Grouping] OpenRenameFriendGroupingInput',
    DeleteFriendGrouping = '[Friend Grouping] DeleteFriendGrouping',
    AddFriendGrouping = '[Friend Grouping] AddFriendGrouping',
    AddFriendGroupingSuccess = '[Friend Grouping] AddFriendGroupingSuccess',
    OpenAddFriendGroupingInput = '[Friend Grouping] OpenAddFriendGroupingInput',
    FriendGroupingDragStart = '[Friend Grouping] FriendGroupingDragStart',
    FriendGroupingChangeSort = '[Friend Grouping] FriendGroupingChangeSort',
    UpdateFriendGrouping = '[Friend Grouping] UpdateFriendGrouping'
}
export class UpdateFriendGrouping implements Action {
    readonly type = FriendGroupingActionTypes.UpdateFriendGrouping;
    constructor(public payload: {
        id: number,
        changes: {
            visible?: boolean,
            stealth?: boolean
        }
    }) {}
}
export class FriendGroupingDragStart implements Action {
    readonly type = FriendGroupingActionTypes.FriendGroupingDragStart;
    constructor(public payload: number) {}
}
export class FriendGroupingChangeSort implements Action {
    readonly type = FriendGroupingActionTypes.FriendGroupingChangeSort;
    constructor(public payload: {id: number, changeSort: number}) {}
}
export class AddFriendGroupingSuccess implements Action {
    readonly type = FriendGroupingActionTypes.AddFriendGroupingSuccess;
    constructor(public payload: {id: number, newId: number}) {}
}
export class AddFriendGrouping implements Action {
    readonly type = FriendGroupingActionTypes.AddFriendGrouping;
    constructor(public payload: {id: number, name: string}) {}
}
export class DeleteFriendGroupingSuccess implements Action {
    readonly type = FriendGroupingActionTypes.DeleteFriendGroupingSuccess;
    constructor(public payload: number) {}
}
export class DeleteFriendGrouping implements Action {
    readonly type = FriendGroupingActionTypes.DeleteFriendGrouping;
    constructor(public payload: number) {}
}
export class OpenRenameFriendGroupingInput implements Action {
    readonly type = FriendGroupingActionTypes.OpenRenameFriendGroupingInput;
    constructor(public payload: number) {}
}
export class OpenAddFriendGroupingInput implements Action {
    readonly type = FriendGroupingActionTypes.OpenAddFriendGroupingInput;
}
export class RenameFriendGrouping implements Action {
    readonly type = FriendGroupingActionTypes.RenameFriendGrouping;
    constructor(public payload: {id: number, name: string}) {}
}
export class FriendGroupingOpenOrClose implements Action {
    readonly type = FriendGroupingActionTypes.FriendGroupingOpenOrClose;
    // friendGroupingId
    constructor(public payload: number) {}
}

export class LoadFriendGroupings implements Action {
    readonly type = FriendGroupingActionTypes.LoadFriendGroupings;
}

export class LoadFriendGroupingsSuccess implements Action {
    readonly type = FriendGroupingActionTypes.LoadFriendGroupingsSuccess;
    constructor(public payload: FriendGrouping[]) {}
}


export type FriendGroupingActionsUnion = LoadFriendGroupings | RenameFriendGrouping |
    LoadFriendGroupingsSuccess | AddFriendGroupingSuccess | OpenAddFriendGroupingInput |
    FriendGroupingOpenOrClose | OpenRenameFriendGroupingInput | DeleteFriendGrouping |
    UpdateFriendGrouping | DeleteFriendGroupingSuccess |
    AddFriendGrouping | FriendGroupingDragStart | FriendGroupingChangeSort;
