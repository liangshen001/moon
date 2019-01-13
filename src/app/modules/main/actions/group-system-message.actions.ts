import {Action} from '@ngrx/store';
import {GroupSystemMessage} from '../models/group-system-message';

export enum GroupSystemMessageActionTypes {
    AddGroupSystemMessage = '[group system message] AddGroupSystemMessage',
    ChangeGroupSystemMessage = '[group system message] ChangeGroupSystemMessage',
    LoadGroupSystemMessages = '[group system message] LoadGroupSystemMessages',
    LoadGroupSystemMessagesSuccess = '[group system message] LoadGroupSystemMessagesSuccess'
}

export class LoadGroupSystemMessagesSuccess implements Action {
    readonly type = GroupSystemMessageActionTypes.LoadGroupSystemMessagesSuccess;
    constructor(public payload: GroupSystemMessage[]) {}
}
export class LoadGroupSystemMessages implements Action {
    readonly type = GroupSystemMessageActionTypes.LoadGroupSystemMessages;
    constructor() {}
}
export class AddGroupSystemMessage implements Action {
    readonly type = GroupSystemMessageActionTypes.AddGroupSystemMessage;
    constructor(public payload: GroupSystemMessage) {}
}

export class ChangeGroupSystemMessage implements Action {
    readonly type = GroupSystemMessageActionTypes.ChangeGroupSystemMessage;
    constructor(public payload: GroupSystemMessage) {}
}

export type GroupSystemMessageActions = AddGroupSystemMessage | ChangeGroupSystemMessage | LoadGroupSystemMessagesSuccess;
