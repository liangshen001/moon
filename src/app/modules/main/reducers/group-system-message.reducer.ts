import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {GroupSystemMessage} from '../models/group-system-message';
import {GroupSystemMessageActions, GroupSystemMessageActionTypes} from '../actions/group-system-message.actions';

export interface GroupSystemMessageState extends EntityState<GroupSystemMessage> {
}

export const groupSystemMessageAdapter: EntityAdapter<GroupSystemMessage> = createEntityAdapter<GroupSystemMessage>({
    selectId: groupSystemMessage => groupSystemMessage.id,
    sortComparer: (gsm1, gsm2) => gsm2.submitTime - gsm1.submitTime
});

export const initialState: GroupSystemMessageState = groupSystemMessageAdapter.getInitialState({
});

export function groupSystemMessageReducer(
    state: GroupSystemMessageState = initialState,
    action: GroupSystemMessageActions
): GroupSystemMessageState {
    switch (action.type) {
        case GroupSystemMessageActionTypes.LoadGroupSystemMessagesSuccess:
            return groupSystemMessageAdapter.addAll(action.payload, state);
        case GroupSystemMessageActionTypes.AddGroupSystemMessage:
            return groupSystemMessageAdapter.addOne(action.payload, state);
        default:
            return state;
    }
}
