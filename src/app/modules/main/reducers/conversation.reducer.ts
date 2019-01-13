import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Conversation} from '../models/conversation';
import {ConversationActions, ConversationActionTypes} from '../actions/conversation.actions';
import {AddFriendMessage, FriendMessageActionTypes, TempAddFriendMessage} from '../actions/friend-message.actions';
import {AddGroupMessage, GroupMessageActionTypes, TempAddGroupMessage} from '../actions/group-message.actions';
import {ChatType} from '../enums/chat-type';


export interface State extends EntityState<Conversation> {
}

export const adapter: EntityAdapter<Conversation> = createEntityAdapter<Conversation>({
    selectId: conversation => conversation.id,
    sortComparer: (conversation1, conversation2) => {
        if (conversation1.top === conversation2.top) {
            return conversation2.sendTime - conversation1.sendTime;
        }
        return conversation2.top ? 1 : -1;
    }
});


export const initialState: State = adapter.getInitialState({});

export function reducer(
    state: State = initialState,
    action: ConversationActions|AddFriendMessage|AddGroupMessage|TempAddFriendMessage|TempAddGroupMessage
): State {
    switch (action.type) {
        case ConversationActionTypes.LoadConversationsSuccess:
            return adapter.addMany(action.payload, state);
        case ConversationActionTypes.AddConversation:
            return adapter.addOne(action.payload, state);
        case ConversationActionTypes.UpdateConversation:
            return adapter.updateOne(action.payload, state);
        case ConversationActionTypes.RemoveConversation:
            return adapter.removeOne(action.payload, state);
        case FriendMessageActionTypes.TempAddFriendMessage:
        case FriendMessageActionTypes.AddFriendMessage:
        case GroupMessageActionTypes.TempAddGroupMessage:
        case GroupMessageActionTypes.AddGroupMessage:
            let chatId;
            let chatType;
            let conversation;
            let content;
            const isSelfSend = action.type === FriendMessageActionTypes.TempAddFriendMessage ||
                action.type === GroupMessageActionTypes.TempAddGroupMessage;

            if (action.type === FriendMessageActionTypes.AddFriendMessage ||
                action.type === FriendMessageActionTypes.TempAddFriendMessage) {
                chatId = action.payload.receiverId;
                chatType = ChatType.FRIEND;
                content = action.payload.content;
            } else if (action.type === GroupMessageActionTypes.AddGroupMessage ||
                action.type === GroupMessageActionTypes.TempAddGroupMessage) {
                chatId = action.payload.groupId;
                chatType = ChatType.GROUP;
                content = `${action.payload.senderName}: ${action.payload.content}`;
            }
            for (const entitiesKey in state.entities) {
                const temp = state.entities[entitiesKey];
                if (temp.chatType === chatType && temp.chatId === chatId) {
                    conversation = temp;
                    break;
                }
            }
            if (conversation) {
                return adapter.updateOne({
                    id: conversation.id,
                    changes: {
                        sendTime: action.payload.sendTime,
                        content,
                        senderId: action.payload.senderId,
                        unreadCount: isSelfSend ? 0 : conversation.unreadCount + 1,
                    }
                }, state);
            } else {
                return state;
            }
        default:
            return state;
    }
}


