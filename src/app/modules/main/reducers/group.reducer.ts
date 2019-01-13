import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Group} from '../models/group.model';
import {
    GroupActions,
    GroupActionTypes
} from '../actions/group.actions';


export interface State extends EntityState<Group> {
}

export const adapter: EntityAdapter<Group> = createEntityAdapter<Group>({
    selectId: (group: Group) => group.id,
    sortComparer: false
});


export const initialState: State = adapter.getInitialState({
});

export function reducer(
    state: State = initialState,
    action: GroupActions
): State {
    switch (action.type) {
        case GroupActionTypes.LoadGroupsSuccess:
            return adapter.addMany(action.payload, state);
        case GroupActionTypes.AddGroupSuccess:
            return adapter.addOne(action.payload, state);
        case GroupActionTypes.GroupLoadInfo:
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

