import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {UserGroup} from '../models/user-group.model';
import {UserGroupAction, UserGroupActionTypes} from '../actions/user-group.action';


export interface UserGroupsState extends EntityState<UserGroup> {
    dragging: boolean;
}

export const userGroupEntityAdapter: EntityAdapter<UserGroup> = createEntityAdapter<UserGroup>({
    selectId: group => group.id,
    sortComparer: false
});


export const initialState: UserGroupsState = userGroupEntityAdapter.getInitialState({
    dragging: false
});

export function userGroupsReducer(
    state = initialState,
    action: UserGroupAction
): UserGroupsState {
    switch (action.type) {
        case UserGroupActionTypes.LoadUserGroupsSuccess:
        case UserGroupActionTypes.AddUserGroupsSuccess:
            return userGroupEntityAdapter.addMany(action.payload, state);
        case UserGroupActionTypes.UpdateUserGroup:
            return userGroupEntityAdapter.updateOne(action.payload, state);
        case UserGroupActionTypes.ExitUserGroup:
            return userGroupEntityAdapter.removeOne(action.payload, state);
        case UserGroupActionTypes.UserGroupDragStart:
            return {...state, dragging: true};
        case UserGroupActionTypes.GroupChangeGroupGrouping:
            return userGroupEntityAdapter.updateOne({
                id: action.payload.id,
                changes: {
                    groupGroupingId: action.payload.groupGroupingId
                }
            }, {...state, dragging: false});
        case UserGroupActionTypes.ChangeGroupToSystemGroupGrouping:
            const updates = [];
            for (const entity of Object.values(state.entities)) {
                if (entity.groupGroupingId === action.payload.groupGroupingId) {
                    updates.push({
                        id: entity.id,
                        changes: {
                            groupGroupingId: action.payload.systemGroupGroupingId
                        }
                    });
                }
            }
            return userGroupEntityAdapter.updateMany(updates, state);
        default: {
            return state;
        }
    }
}

