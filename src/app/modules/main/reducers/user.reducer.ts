import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {UserAction, UserActionTypes} from '../actions/user.action';
import {User} from '../../../models/user.model';


export interface State extends EntityState<User> {
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: false
});


export const initialState: State = adapter.getInitialState({});

export function reducer(
    state: State = initialState,
    action: UserAction
): State {
    switch (action.type) {
        case UserActionTypes.LoadUsersSuccess:
            return adapter.addMany(action.payload, state);
        case UserActionTypes.ChangeUser:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    ...action.payload
                }
            }, state);
        case UserActionTypes.FriendLoadInfo:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    loadInfo: true
                }
            }, state);
        default:
            return state;
    }
}

