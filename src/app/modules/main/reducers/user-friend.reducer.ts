import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {UserFriend} from '../models/user-friend.model';
import {UserFriendAction, UserFriendActionTypes} from '../actions/user-friend.actions';
import {
    FriendGroupingActionTypes, UpdateFriendGrouping
} from '../actions/friend-grouping.action';


export interface State extends EntityState<UserFriend> {
    dragging: boolean;
}

export const adapter: EntityAdapter<UserFriend> = createEntityAdapter<UserFriend>({
    selectId: (friend: UserFriend) => friend.id,
    sortComparer: false
});


export const initialState: State = adapter.getInitialState({
    dragging: false
});

export function reducer(
    state = initialState,
    action: UserFriendAction | UpdateFriendGrouping
): State {
    const updates = [];
    switch (action.type) {
        case UserFriendActionTypes.LoadUserFriendsSuccess:
            return adapter.addMany(action.payload, state);
        case UserFriendActionTypes.UpdateUserFriend:
            return adapter.updateOne(action.payload, state);
        case UserFriendActionTypes.DeleteUserFriend:
            return adapter.removeOne(action.payload, state);
        case UserFriendActionTypes.FriendChangeFriendGrouping:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    friendGroupingId: action.payload.friendGroupingId,
                }
            }, {...state, dragging: false});
        case UserFriendActionTypes.UserFriendDragStart:
            return {...state, dragging: true};
        case UserFriendActionTypes.AddAsFriendsSuccess:
            return adapter.addOne(action.payload, state);
        case UserFriendActionTypes.ChangeFriendToMyFriendFriendGrouping:
            for (const entity of Object.values(state.entities)) {
                if (entity.friendGroupingId === action.payload.friendGroupingId) {
                    updates.push({
                        id: entity.id,
                        changes: {
                            friendGroupingId: action.payload.myFriendFriendGroupingId
                        }
                    });
                }
            }
            return adapter.updateMany(updates, state);
        case FriendGroupingActionTypes.UpdateFriendGrouping:
            for (const entity of Object.values(state.entities)) {
                if (entity.friendGroupingId === action.payload.id) {
                    updates.push({
                        id: entity.id,
                        changes: action.payload.changes
                    });
                }
            }
            return adapter.updateMany(updates, state);
        default: {
            return state;
        }
    }
}

