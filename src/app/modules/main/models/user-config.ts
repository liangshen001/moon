import {ImgShowType} from '../enums/img-show-type';
import {FriendNameShowType} from '../enums/friend-name-show-type';
import {ListShowType} from '../enums/list-show-type';
import {FriendListSortType} from '../enums/friend-list-sort-type';

export interface UserConfig {
    id: number;

    userId: number;

    friendImgShowType: ImgShowType;

    friendSelectedShowBigImg: boolean;

    friendNameShowType: FriendNameShowType;

    listShowType: ListShowType;

    showSimpleFriend: boolean;

    friendListSortType: FriendListSortType;

    showOnlineFriend: boolean;

    showStranger: boolean;

    showBlackList: boolean;

    groupImgShowType: ImgShowType;

    groupSelectedShowBigImg: boolean;

    background: string;

    opacity: number;

    turnOffAllSounds: boolean;

    closeHeadFlicker: boolean;
}
