import {Action} from '@ngrx/store';
import {FriendValidation} from '../models/friend-validation';

export enum FriendValidationActionTypes {
    AddFriendValidation = '[friend validation] AddFriendValidation',
    LoadFriendValidation = '[friend validation] LoadFriendValidation',
    LoadFriendValidationSuccess = '[friend validation] LoadFriendValidationSuccess'
}

export class LoadFriendValidation implements Action {
    readonly type = FriendValidationActionTypes.LoadFriendValidation;
}
export class LoadFriendValidationSuccess implements Action {
    readonly type = FriendValidationActionTypes.LoadFriendValidationSuccess;
    constructor(public payload: FriendValidation[]) {}
}
export class AddFriendValidation implements Action {
    readonly type = FriendValidationActionTypes.AddFriendValidation;
    constructor(public payload: FriendValidation) {}
}

export type FriendValidationActions = AddFriendValidation | LoadFriendValidationSuccess;
