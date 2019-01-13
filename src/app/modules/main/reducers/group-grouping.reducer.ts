import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {GroupGrouping} from '../models/group-grouping.model';
import {GroupGroupingActionsUnion, GroupGroupingActionTypes} from '../actions/group-grouping.action';


export interface State extends EntityState<GroupGrouping> {
    dragging: boolean;
}

export const adapter: EntityAdapter<GroupGrouping> = createEntityAdapter<GroupGrouping>({
    selectId: (friendGroup: GroupGrouping) => friendGroup.id,
    sortComparer: false
});


export const initialState: State = adapter.getInitialState({
    dragging: false
});

export function reducer(
    state = initialState,
    action: GroupGroupingActionsUnion
): State {
    switch (action.type) {
        case GroupGroupingActionTypes.LoadGroupGroupingsSuccess:
            return adapter.addMany(action.payload, state);
        case GroupGroupingActionTypes.GroupGroupingOpenOrClose:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    open: !state.entities[action.payload].open
                }
            }, state);
        case GroupGroupingActionTypes.OpenRenameGroupGroupingInput:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    renaming: true
                }
            }, state);
        case GroupGroupingActionTypes.RenameGroupGrouping:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    renaming: false,
                    name: action.payload.name
                }
            }, state);
        case GroupGroupingActionTypes.DeleteGroupGroupingSuccess:
        case GroupGroupingActionTypes.DeleteGroupGrouping:
            return adapter.removeOne(action.payload, state);
        case GroupGroupingActionTypes.AddGroupGrouping:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    name: (action.payload.name === undefined ? '' : action.payload.name),
                    adding: false
                }
            }, state);
        case GroupGroupingActionTypes.OpenAddGroupGroupingInput:
            return adapter.addOne({
                id: new Date().valueOf(),
                adding: true,
                sort: state.ids.length,
                name: ''
            }, state);
        case GroupGroupingActionTypes.AddGroupGroupingSuccess:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    id: action.payload.newId
                }
            }, state);
        case GroupGroupingActionTypes.GroupGroupingDragStart:
            return adapter.updateOne({
                id: action.payload,
                changes: {
                    dragging: true
                }
            }, {
                ...state,
                dragging: true
            });
        case GroupGroupingActionTypes.GroupGroupingChangeSort:
            const updates = [];
            const sort = state.entities[action.payload.id].sort;
            const changeSort = action.payload.changeSort;
            const direct = changeSort - sort;
            for (const entitiesKey in state.entities) {
                const entity = state.entities[entitiesKey];
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
                    sort: changeSort,
                    dragging: false
                }
            });
            return adapter.updateMany(updates, {...state, dragging: false});
        default:
            return state;
    }
}

