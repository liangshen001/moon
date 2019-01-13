// import {Action} from '@ngrx/store';
// import {LoginUser} from '../modules/auth/models/login-user.model';
// import {User} from '../models/user.model';
//
//
// export enum AppUserActionTypes {
//     Login = '[App] Login',
//     LoginSuccess = '[App] Login Success',
//     LoginFail = '[App] Login Fail',
// }
//
// export class Login implements Action {
//     readonly type = AppUserActionTypes.Login;
//     constructor(public payload: User) {}
// }
//
// export class LoginSuccess implements Action {
//     readonly type = AppUserActionTypes.LoginSuccess;
//     constructor(public payload: LoginUser[]) {}
// }
//
// export class LoginFail implements Action {
//     readonly type = AppUserActionTypes.LoginFail;
// }
//
// export type AppActionsUnion = Login |
//     LoginSuccess |
//     LoginFail;
// //
// // export const FETCH_FRIEND_GROUPS = 'FETCH_FRIEND_GROUPS';
// // export const ADD_FRIEND_GROUP = 'ADD_FRIEND_GROUP';
// //
// // export class FetchFriendGroupsAction implements Action {
// //     readonly type = FETCH_FRIEND_GROUPS;
// //     constructor(public payload: FriendGrouping[]) {}
// // }
// //
// // export class AddFriendGroupAction implements Action {
// //     readonly type = ADD_FRIEND_GROUP;
// //     constructor(public payload: FriendGrouping) {}
// // }
// //
// // export type FriendGroupsActions = FetchFriendGroupsAction | AddFriendGroupAction;
// //
// // export class FriendGroupsState {
// //     constructor(public friendGroupings: FriendGrouping[]) {}
// // }
// //
import {Action} from '@ngrx/store';
import {User} from '../models/user.model';
import {OnlineStatus} from '../enums/online-status';

export enum AppActionTypes {
    LoginRedirect = '[App] LoginRedirect',
    LoginSuccess = '[App] LoginSuccess',
    Logout = '[App] Logout',
    ChangeOnlineStatus = '[App] ChangeOnlineStatus',
    EditSaying = '[App] EditSaying'
}
export class EditSaying implements Action {
  readonly type = AppActionTypes.EditSaying;
  constructor(public payload: string) {}
}
export class ChangeOnlineStatus implements Action {
  readonly type = AppActionTypes.ChangeOnlineStatus;
  constructor(public payload: OnlineStatus) {}
}
export class Logout implements Action {
    readonly type = AppActionTypes.Logout;
}
export class LoginRedirect implements Action {
    readonly type = AppActionTypes.LoginRedirect;
}
export class LoginSuccess implements Action {
    readonly type = AppActionTypes.LoginSuccess;
    constructor(public payload: User) {}
}

export type AppActions = LoginRedirect | LoginSuccess | Logout | ChangeOnlineStatus | EditSaying;
