import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {LoginUser} from "../models/login-user.model";
import {LoadLoginUsersActionsUnion, LoginUserActionTypes} from "../actions/login-user.actions";
import {AppActionTypes, LoginSuccess} from "../../../actions/app.actions";


export interface State extends EntityState<LoginUser> {
    loggingIn: boolean;
    error: boolean;
    message: string;
}

export const adapter: EntityAdapter<LoginUser> = createEntityAdapter<LoginUser>({
    selectId: (localUser: LoginUser) => localUser.account,
    sortComparer: false
});


export const initialState: State = adapter.getInitialState({
    loggingIn: false,
    error: false,
    message: null
});

export function reducer(
    state = initialState,
    action: LoadLoginUsersActionsUnion | LoginSuccess
): State {
    switch (action.type) {
        case LoginUserActionTypes.LoadLoginUsersSuccess:
            return adapter.addMany(action.payload, state);
        case LoginUserActionTypes.Login:
            return adapter.addOne(action.payload, {
                ...state,
                error: false,
                loggingIn: true
            });
        case LoginUserActionTypes.CancelLogin:
        case AppActionTypes.LoginSuccess:
            return {
                ...state,
                error: false,
                loggingIn: false
            };
        case LoginUserActionTypes.LoginFailure:
            return {
                ...state,
                loggingIn: false,
                error: true,
                message: action.payload
            };
        default: {
            return state;
        }
    }
}

