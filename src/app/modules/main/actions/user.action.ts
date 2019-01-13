import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';

export enum UserActionTypes {
    LoadUsersSuccess = '[User] LoadUsersSuccess',
    LoadUsers = '[User] LoadUsers',
    ChangeUser = '[User] ChangeUser',
    FriendLoadInfo = '[User] FriendLoadInfo'
}
export class FriendLoadInfo implements Action {
    readonly type = UserActionTypes.FriendLoadInfo;
    constructor(public payload: number) {}
}
export class LoadUsersSuccess implements Action {
    readonly type = UserActionTypes.LoadUsersSuccess;
    constructor(public payload: User[]) {}
}
export class LoadUsers implements Action {
    readonly type = UserActionTypes.LoadUsers;
    // groupId
    constructor(public payload?: number) {}
}
export class ChangeUser implements Action {
    readonly type = UserActionTypes.ChangeUser;
    constructor(public payload: User) {}
}

export type UserAction = LoadUsersSuccess | LoadUsers | ChangeUser |
    FriendLoadInfo;
