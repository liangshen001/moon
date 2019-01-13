import {Action} from '@ngrx/store';
import {FriendMessage} from '../models/friend-message.model';

export enum FriendMessageActionTypes {
    LoadFriendMessagesSuccess = '[Message] LoadFriendMessagesSuccess',
    LoadFriendMessages = '[Message] LoadFriendMessages',
    SendFriendMessage = '[Message] SendFriendMessage',
    AddFriendMessage = '[Message] AddFriendMessage',
    TempAddFriendMessage = '[Message] TempAddFriendMessage',
    SendFriendMessageSuccess = '[Message] SendFriendMessageSuccess',
    ResendFriendMessage = '[Message] ResendFriendMessage',
    SendFriendMessageFailure = '[Message] SendFriendMessageFailure'
}
export class SendFriendMessageFailure implements Action {
    readonly type = FriendMessageActionTypes.SendFriendMessageFailure;
    constructor(public payload: number) {}
}
export class ResendFriendMessage implements Action {
    readonly type = FriendMessageActionTypes.ResendFriendMessage;
    constructor(public payload: number) {}
}
export class SendFriendMessageSuccess implements Action {
    readonly type = FriendMessageActionTypes.SendFriendMessageSuccess;
    constructor(public payload: {id: number, newId: number, sendTime: number}) {}
}
export class SendFriendMessage implements Action {
    readonly type = FriendMessageActionTypes.SendFriendMessage;
    constructor(public payload: {content: string, friendId: number}) {}
}

export class TempAddFriendMessage implements Action {
    readonly type = FriendMessageActionTypes.TempAddFriendMessage;
    constructor(public payload: FriendMessage) {}
}

export class AddFriendMessage implements Action {
    readonly type = FriendMessageActionTypes.AddFriendMessage;
    constructor(public payload: FriendMessage) {}
}
export class LoadFriendMessagesSuccess implements Action {
    readonly type = FriendMessageActionTypes.LoadFriendMessagesSuccess;
    constructor(public payload: FriendMessage[]) {}
}
export class LoadFriendMessages implements Action {
    readonly type = FriendMessageActionTypes.LoadFriendMessages;
    // friendId
    constructor(public payload: number) {}
}

export type FriendMessageActionsUnion = LoadFriendMessagesSuccess|AddFriendMessage|
    LoadFriendMessages|SendFriendMessage|SendFriendMessageFailure|TempAddFriendMessage|
    SendFriendMessageSuccess|ResendFriendMessage;
