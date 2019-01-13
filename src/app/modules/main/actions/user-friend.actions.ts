import {Action} from '@ngrx/store';
import {UserFriend} from '../models/user-friend.model';


export enum UserFriendActionTypes {
    UpdateUserFriend = '[UserFriend] UpdateUserFriend',
    ChangeFriendToMyFriendFriendGrouping = '[UserFriend] ChangeFriendToMyFriendFriendGrouping',
    LoadUserFriendsSuccess = '[UserFriend] LoadUserFriendsSuccess',
    LoadUserFriends = '[UserFriend] Load Friends',
    DeleteUserFriend = '[UserFriend] Delete UserFriend',
    FriendChangeFriendGrouping = '[UserFriend] FriendChangeFriendGrouping',
    UserFriendDragStart = '[UserFriend] UserFriendDragStart',
    AddAsFriends = '[UserFriend] AddAsFriends',
    AddAsFriendsSuccess = '[UserFriend]  AddAsFriends',
}
export class UpdateUserFriend implements Action {
    readonly type = UserFriendActionTypes.UpdateUserFriend;
    constructor(public payload: {
        id: number,
        changes: {
            shield?: boolean,
            stealth?: boolean,
            visible?: boolean,
            remark?: string
        }
    }) {}
}
export class ChangeFriendToMyFriendFriendGrouping implements Action {
    readonly type = UserFriendActionTypes.ChangeFriendToMyFriendFriendGrouping;
    constructor(public payload: {myFriendFriendGroupingId: number, friendGroupingId: number}) {}
}
export class AddAsFriendsSuccess implements Action {
    readonly type = UserFriendActionTypes.AddAsFriendsSuccess;
    constructor(public payload: UserFriend) {}
}
export class AddAsFriends implements Action {
    readonly type = UserFriendActionTypes.AddAsFriends;
    constructor(public payload: {friendId: number, friendGroupingId: number}) {}
}
export class UserFriendDragStart implements Action {
    readonly type = UserFriendActionTypes.UserFriendDragStart;
}
export class FriendChangeFriendGrouping implements Action {
    readonly type = UserFriendActionTypes.FriendChangeFriendGrouping;
    constructor(public payload: {id: number, friendGroupingId: number}) {}
}
export class DeleteUserFriend implements Action {
    readonly type = UserFriendActionTypes.DeleteUserFriend;
    constructor(public payload: number) {}
}
export class DeleteUserFriendSuccess implements Action {
    readonly type = UserFriendActionTypes.DeleteUserFriend;
    constructor(public payload: number) {}
}
export class LoadUserFriendsSuccess implements Action {
    readonly type = UserFriendActionTypes.LoadUserFriendsSuccess;
    constructor(public payload: UserFriend[]) {}
}
export class LoadUserFriends implements Action {
    readonly type = UserFriendActionTypes.LoadUserFriends;
}

export type UserFriendAction = LoadUserFriendsSuccess |
    DeleteUserFriend | FriendChangeFriendGrouping | UserFriendDragStart |
    AddAsFriends | AddAsFriendsSuccess | ChangeFriendToMyFriendFriendGrouping |
    UpdateUserFriend;
