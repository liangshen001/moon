import {Action} from '@ngrx/store';
import {LoginUser} from '../models/login-user.model';


export enum LoginUserActionTypes {
    LoadLoginUsers = '[Login Users] Load',
    LoadLoginUsersSuccess = '[Login Users] Load Success',
    LoadLoginUsersFail = '[Login Users] Load Fail',
    Login = '[Login Users] Login',
    CancelLogin = '[Login Users] Cancel Login',
    LoginFailure = '[app]',
}

export class CancelLogin implements Action {
    readonly type = LoginUserActionTypes.CancelLogin;
}
export class LoginFailure implements Action {
    readonly type = LoginUserActionTypes.LoginFailure;
    constructor(public payload: string) {}
}
export class Login implements Action {
    readonly type = LoginUserActionTypes.Login;
    constructor(public payload: LoginUser) {}
}

export class LoadLoginUsers implements Action {
    readonly type = LoginUserActionTypes.LoadLoginUsers;
}

export class LoadLoginUsersSuccess implements Action {
    readonly type = LoginUserActionTypes.LoadLoginUsersSuccess;
    constructor(public payload: LoginUser[]) {}
}

export class LoadLocalUsersFail implements Action {
    readonly type = LoginUserActionTypes.LoadLoginUsersFail;
}

export type LoadLoginUsersActionsUnion = LoadLoginUsers |
    LoadLoginUsersSuccess | LoginFailure |
    LoadLocalUsersFail |
    Login |
    CancelLogin;
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
