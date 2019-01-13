import {FriendGroupingActionsUnion, FriendGroupingActionTypes} from '../actions/friend-grouping.action';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {FriendGrouping} from '../models/friend-grouping.model';
import {FriendGroupingType} from '../models/friend-grouping-type.enum';


export interface State extends EntityState<FriendGrouping> {
    dragging: boolean;
}

export const adapter: EntityAdapter<FriendGrouping> = createEntityAdapter<FriendGrouping>({
    selectId: (friendGroup: FriendGrouping) => friendGroup.id,
    sortComparer: (fg1, fg2) => fg1.sort * fg2.sort >= 0 ? fg1.sort - fg2.sort : -fg1.sort
});


export const initialState: State = adapter.getInitialState({
    dragging: false
});

export function reducer(
    state = initialState,
    action: FriendGroupingActionsUnion
): State {
    switch (action.type) {
        case FriendGroupingActionTypes.LoadFriendGroupingsSuccess:
            return adapter.addMany(action.payload, state);
        case FriendGroupingActionTypes.FriendGroupingOpenOrClose:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    open: !state.entities[action.payload].open
                }
            }, state);
        case FriendGroupingActionTypes.OpenRenameFriendGroupingInput:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    renaming: true
                }
            }, state);
        case FriendGroupingActionTypes.RenameFriendGrouping:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    renaming: false,
                    name: action.payload.name
                }
            }, state);
        case FriendGroupingActionTypes.UpdateFriendGrouping:
            return adapter.updateOne(action.payload, state);
        case FriendGroupingActionTypes.DeleteFriendGroupingSuccess:
        case FriendGroupingActionTypes.DeleteFriendGrouping:
            return adapter.removeOne(action.payload, state);
        case FriendGroupingActionTypes.AddFriendGrouping:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    name: (action.payload.name === undefined ? '0' : action.payload.name),
                    adding: false
                }
            }, state);
        case FriendGroupingActionTypes.AddFriendGroupingSuccess:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    id: action.payload.newId
                }
            }, state);
        case FriendGroupingActionTypes.OpenAddFriendGroupingInput:
            return adapter.addOne({
                id: new Date().valueOf(),
                adding: true,
                sort: state.ids.length,
                type: FriendGroupingType.CUSTOM,
                name: ''
            }, state);
        case FriendGroupingActionTypes.FriendGroupingDragStart:
            return {
                ...state,
                dragging: true
            };
        case FriendGroupingActionTypes.FriendGroupingChangeSort:
            const updates = [];
            const sort = state.entities[action.payload.id].sort;
            const changeSort = action.payload.changeSort;
            const direct = changeSort - sort;
            for (const entity of Object.values(state.entities)) {
                if (direct > 0 && entity.sort <= changeSort && entity.sort > sort) {
                    updates.push({
                        id: entity.id,
                        changes: {
                            sort: entity.sort - 1
                        }
                    });
                } else if (direct < 0 && entity.sort >= changeSort && entity.sort < sort) {
                    updates.push({
                        id: entity.id,
                        changes: {
                            sort: entity.sort + 1
                        }
                    });
                }
            }
            updates.push({
                id: action.payload.id,
                changes: {
                    sort: changeSort
                }
            });
            return adapter.updateMany(updates, {...state, dragging: false});
        default: {
            return state;
        }
    }
}

