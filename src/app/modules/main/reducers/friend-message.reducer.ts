import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {FriendMessageActionsUnion, FriendMessageActionTypes} from '../actions/friend-message.actions';
import {FriendMessage} from '../models/friend-message.model';


export interface State extends EntityState<FriendMessage> {
}

export const adapter: EntityAdapter<FriendMessage> = createEntityAdapter<FriendMessage>({
    selectId: (message: FriendMessage) => message.id,
    // 1.发送中的消息在后面 2.时间最近的在后面
    sortComparer: (message1, message2) => !!message1.sending === !!message2.sending ?
        message1.sendTime - message2.sendTime : +!!message1.sending
});


export const initialState: State = adapter.getInitialState({
});

export function reducer(
    state: State = initialState,
    action: FriendMessageActionsUnion
): State {
    switch (action.type) {
        case FriendMessageActionTypes.LoadFriendMessagesSuccess:
            return adapter.addMany(action.payload, state);
        case FriendMessageActionTypes.TempAddFriendMessage:
        case FriendMessageActionTypes.AddFriendMessage:
            return adapter.addOne(action.payload, state);
        case FriendMessageActionTypes.SendFriendMessageSuccess:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    id: action.payload.newId,
                    sendTime: action.payload.sendTime,
                    sending: false,
                    sendError: false
                }
            }, state);
        case FriendMessageActionTypes.ResendFriendMessage:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    sending: true,
                    sendError: false
                }
            }, state);
        case FriendMessageActionTypes.SendFriendMessageFailure:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    sending: false,
                    sendError: true
                }
            }, state);
        default:
            return state;
    }
}

