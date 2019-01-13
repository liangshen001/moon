import {User} from '../models/user.model';
import {AppActions, AppActionTypes} from '../actions/app.actions';


export interface AppState {
    user: User | null;
    loggedIn: boolean;
}

export const initialState: AppState = {
    user: null,
    loggedIn: false,
};

export function reducer(
    state = initialState,
    action: AppActions
): AppState {
    switch (action.type) {
        case AppActionTypes.LoginSuccess:
            return {
                user: action.payload,
                loggedIn: true
            };
        case AppActionTypes.Logout:
            return {
                user: null,
                loggedIn: false
            };
        case AppActionTypes.ChangeOnlineStatus:
            return {
                ...state,
                user: {
                    ...state.user,
                    onlineStatus: action.payload
                }
            };
        case AppActionTypes.EditSaying:
            return {
                ...state,
                user: {
                    ...state.user,
                    saying: action.payload
                }
            };
        default:
            return state;
    }
}



