import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {FriendValidation} from '../models/friend-validation';
import {FriendValidationActions, FriendValidationActionTypes} from '../actions/friend-validation.actions';

export interface FriendValidationState extends EntityState<FriendValidation> {
}

export const friendValidationAdapter: EntityAdapter<FriendValidation> = createEntityAdapter<FriendValidation>({
    selectId: friendValidation => friendValidation.id,
    sortComparer: (fv1, fv2) => fv2.applyTime - fv1.applyTime
});

export const initialState: FriendValidationState = friendValidationAdapter.getInitialState({
});

export function friendValidationReducer(
    state: FriendValidationState = initialState,
    action: FriendValidationActions
): FriendValidationState {
    switch (action.type) {
        case FriendValidationActionTypes.AddFriendValidation:
            return friendValidationAdapter.addOne(action.payload, state);
        case FriendValidationActionTypes.LoadFriendValidationSuccess:
            return friendValidationAdapter.addAll(action.payload, state);
        default:
            return state;
    }
}
