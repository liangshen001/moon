import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {GroupMessageActionsUnion, GroupMessageActionTypes} from '../actions/group-message.actions';
import {GroupMessage} from '../models/group-message.model';


export interface State extends EntityState<GroupMessage> {
}

export const adapter: EntityAdapter<GroupMessage> = createEntityAdapter<GroupMessage>({
    selectId: (message: GroupMessage) => message.id,
    sortComparer: (message1, message2) => message1.sendTime - message2.sendTime
});


export const initialState: State = adapter.getInitialState({
});

export function reducer(
    state: State = initialState,
    action: GroupMessageActionsUnion
): State {
    switch (action.type) {
        case GroupMessageActionTypes.LoadGroupMessagesSuccess:
            return adapter.addMany(action.payload, state);
        case GroupMessageActionTypes.TempAddGroupMessage:
        case GroupMessageActionTypes.AddGroupMessage:
            return adapter.addOne(action.payload, state);
        case GroupMessageActionTypes.SendGroupMessageSuccess:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    id: action.payload.newId,
                    sending: false,
                    sendError: false
                }
            }, state);
        case GroupMessageActionTypes.SendGroupMessageFailure:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    sending: false,
                    sendError: true
                }
            }, state);
        case GroupMessageActionTypes.ResendGroupMessage:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    sending: true,
                    sendError: false
                }
            }, state);
        default:
            return state;
    }
}

