import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromLoginUser from "./login-users.reducer";

export interface AuthState {
    loginUsers: fromLoginUser.State;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
    loginUsers: fromLoginUser.reducer
};

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getLoginUserState = createSelector(
    getAuthState, state => state.loginUsers
);

export const getLoggingIn = createSelector(getLoginUserState, state => state.loggingIn);


export const {
    selectIds: getLoginUserAccounts,
    selectEntities: getLoginUserEntities,
    selectAll: getAllLoginUsers,
    selectTotal: getTotalLoginUsers,
} = fromLoginUser.adapter.getSelectors(getLoginUserState);


