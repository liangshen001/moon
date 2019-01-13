import {Action} from '@ngrx/store';
import {Conversation} from '../models/conversation';


export enum ConversationActionTypes {
    LoadConversations = '[Conversation] LoadConversationsSuccess',
    LoadConversationsSuccess = '[Conversation] LoadUserFriendsSuccess',
    RemoveConversation = '[Conversation] RemoveConversation',
    AddConversation = '[Conversation] AddConversation',
    UpdateConversation = '[Conversation] UpdateConversation',
}
export class UpdateConversation implements Action {
    readonly type = ConversationActionTypes.UpdateConversation;
    constructor(public payload: {
        id: number,
        changes: {
            unreadCount?: number,
            top?: boolean
        }
    }) {}
}
export class AddConversation implements Action {
    readonly type = ConversationActionTypes.AddConversation;
    constructor(public payload: Conversation) {}
}
export class RemoveConversation implements Action {
    readonly type = ConversationActionTypes.RemoveConversation;
    constructor(public payload: number) {}
}
export class LoadConversationsSuccess implements Action {
    readonly type = ConversationActionTypes.LoadConversationsSuccess;
    constructor(public payload: Conversation[]) {}
}
export class LoadConversations implements Action {
    readonly type = ConversationActionTypes.LoadConversations;

}

export type ConversationActions = LoadConversationsSuccess | LoadConversations
    | UpdateConversation | RemoveConversation | AddConversation;
