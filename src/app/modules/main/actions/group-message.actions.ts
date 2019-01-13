import {Action} from '@ngrx/store';
import {GroupMessage} from '../models/group-message.model';

export enum GroupMessageActionTypes {
    LoadGroupMessagesSuccess = '[Message] LoadGroupMessagesSuccess',
    LoadGroupMessages = '[Message] LoadGroupMessages',
    SendGroupMessage = '[Message] SendGroupMessage',
    AddGroupMessage = '[Message] AddGroupMessage',
    TempAddGroupMessage = '[Message] TempAddGroupMessage',
    SendGroupMessageSuccess = '[Message] SendGroupMessageSuccess',
    SendGroupMessageFailure = '[Message] SendGroupMessageFailure',
    ResendGroupMessage = '[Message] ResendGroupMessage'
}
export class ResendGroupMessage implements Action {
    readonly type = GroupMessageActionTypes.ResendGroupMessage;
    constructor(public payload: number) {}
}
export class SendGroupMessageFailure implements Action {
    readonly type = GroupMessageActionTypes.SendGroupMessageFailure;
    constructor(public payload: number) {}
}
export class SendGroupMessageSuccess implements Action {
    readonly type = GroupMessageActionTypes.SendGroupMessageSuccess;
    constructor(public payload: {id: number, newId: number, sendTime: number}) {}
}
export class SendGroupMessage implements Action {
    readonly type = GroupMessageActionTypes.SendGroupMessage;
    constructor(public payload: {content: string, groupId: number}) {}
}

/**
 * 临时添加消息（发送中的消息）
 */
export class TempAddGroupMessage implements Action {
    readonly type = GroupMessageActionTypes.TempAddGroupMessage;
    constructor(public payload: GroupMessage & {senderName: string}) {}
}
export class AddGroupMessage implements Action {
    readonly type = GroupMessageActionTypes.AddGroupMessage;
    constructor(public payload: GroupMessage & {senderName: string}) {}
}
export class LoadGroupMessagesSuccess implements Action {
    readonly type = GroupMessageActionTypes.LoadGroupMessagesSuccess;
    constructor(public payload: GroupMessage[]) {}
}
export class LoadGroupMessages implements Action {
    readonly type = GroupMessageActionTypes.LoadGroupMessages;
    // groupId
    constructor(public payload: number) {}
}

export type GroupMessageActionsUnion = LoadGroupMessagesSuccess|AddGroupMessage|
    SendGroupMessage|AddGroupMessage|SendGroupMessageSuccess|SendGroupMessageFailure|
    ResendGroupMessage|TempAddGroupMessage;
