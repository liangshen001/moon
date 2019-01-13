import {UserConfig} from '../models/user-config';
import {UserConfigActions, UserConfigActionTypes} from '../actions/user-config.actions';

export type UserConfigState = UserConfig;
const initialState: UserConfigState = null;

export function userConfigReducer(
    state: UserConfigState = initialState,
    action: UserConfigActions
): UserConfigState {
    switch (action.type) {
        case UserConfigActionTypes.LoadUserConfigSuccess:
            return action.payload;
        case UserConfigActionTypes.UpdateUserConfig:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
