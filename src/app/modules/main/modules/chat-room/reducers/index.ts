// import {
//     createSelector,
//     createFeatureSelector,
//     ActionReducerMap,
// } from '@ngrx/store';
// import * as fromFriendMessages from '../../../reducers/friend-message.reducer';
import * as fromRoot from '../../../reducers';
//
export interface ChatRoomState {
    // friendMessages: fromFriendMessages.State;
}
//
export interface State extends fromRoot.State {
}
//
import {ActionReducerMap} from "@ngrx/store";

export const reducers: ActionReducerMap<ChatRoomState> = {
    // friendMessages: fromFriendMessages.reducer
};
//
// export const getChatRoomState = createFeatureSelector<ChatRoomState>('chatRoom');
//
// export const getFriendMessageEntitiesState = createSelector(
//     getChatRoomState,
//     state => state.friendMessages
// );
//
//
// export const {
//     selectIds: getFriendMessageIds,
//     selectEntities: getFriendMessageEntities,
//     selectAll: getAllFriendMessages,
//     selectTotal: getTotalFriendMessages,
// } = fromFriendMessages.adapter.getSelectors(getFriendMessageEntitiesState);
//
//
//
//
