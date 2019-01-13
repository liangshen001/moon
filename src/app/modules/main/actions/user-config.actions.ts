import {Action} from '@ngrx/store';
import {ImgShowType} from '../enums/img-show-type';
import {FriendNameShowType} from '../enums/friend-name-show-type';
import {ListShowType} from '../enums/list-show-type';
import {FriendListSortType} from '../enums/friend-list-sort-type';
import {UserConfig} from '../models/user-config';

export enum UserConfigActionTypes {
    LoadUserConfig = 'LoadUserConfig',
    UpdateUserConfig = 'UpdateUserConfig',
    LoadUserConfigSuccess = 'LoadUserConfigSuccess'
}

export class UpdateUserConfig implements Action {
    readonly type = UserConfigActionTypes.UpdateUserConfig;
    constructor(public payload: {
        friendImgShowType?: ImgShowType;
        friendSelectedShowBigImg?: boolean;
        friendNameShowType?: FriendNameShowType;
        listShowType?: ListShowType;
        showSimpleFriend?: boolean;
        friendListSortType?: FriendListSortType;
        showOnlineFriend?: boolean;
        showStranger?: boolean;
        showBlackList?: boolean;
        groupImgShowType?: ImgShowType;
        groupSelectedShowBigImg?: boolean;
        background?: string;
        opacity?: number;
        turnOffAllSounds?: boolean;
        closeHeadFlicker?: boolean;
    }) {}
}
export class LoadUserConfig implements Action {
    readonly type = UserConfigActionTypes.LoadUserConfig;
}
export class LoadUserConfigSuccess implements Action {
    readonly type = UserConfigActionTypes.LoadUserConfigSuccess;
    constructor(public payload: UserConfig) {}
}

export type UserConfigActions = LoadUserConfigSuccess | UpdateUserConfig;
